// /Users/hugomendoza/Desktop/raper/api/notion.js
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const PRODUCTS_DATABASE_ID = process.env.NOTION_PRODUCTS_DB_ID;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Obtener productos desde Notion
      const response = await notion.databases.query({
        database_id: PRODUCTS_DATABASE_ID,
        filter: {
          property: 'Status',
          select: {
            equals: 'Published'
          }
        },
        sorts: [
          {
            property: 'Price',
            direction: 'descending'
          }
        ]
      });

      // Transformar datos de Notion a formato del frontend
      const products = response.results.map(page => {
        const properties = page.properties;
        
        return {
          id: page.id,
          name: properties.Name?.title?.[0]?.text?.content || 'Sin nombre',
          description: properties.Description?.rich_text?.[0]?.text?.content || 'Sin descripción',
          price: properties.Price?.number || 0,
          image: properties.Image?.files?.[0]?.file?.url || properties.Image?.files?.[0]?.external?.url || '',
          color: properties.Color?.select?.name || 'Default',
          category: properties.Category?.select?.name || 'Auriculares',
          status: properties.Status?.select?.name || 'Draft',
          stock: properties.Stock?.number || 0,
          featured: properties.Featured?.checkbox || false
        };
      });

      // Cache headers para mejorar performance
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      
      res.status(200).json({
        success: true,
        products,
        count: products.length,
        timestamp: new Date().toISOString()
      });

    } else if (req.method === 'POST') {
      // Crear nuevo producto en Notion
      const { name, description, price, image, color, category } = req.body;
      
      const response = await notion.pages.create({
        parent: { database_id: PRODUCTS_DATABASE_ID },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: name
                }
              }
            ]
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: description
                }
              }
            ]
          },
          Price: {
            number: price
          },
          Image: {
            files: [
              {
                external: {
                  url: image
                }
              }
            ]
          },
          Color: {
            select: {
              name: color
            }
          },
          Category: {
            select: {
              name: category
            }
          },
          Status: {
            select: {
              name: 'Published'
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        product: response,
        message: 'Producto creado exitosamente'
      });

    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: `Método ${req.method} no permitido`
      });
    }

  } catch (error) {
    console.error('Error en Notion API:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 