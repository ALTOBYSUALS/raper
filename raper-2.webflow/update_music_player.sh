#!/bin/bash

# Backup files
cp index.html index.html.backup
cp css/mobile-responsive-fixes.css css/mobile-responsive-fixes.css.backup

echo "✅ Archivos de respaldo creados"

# Update HTML - Replace the playlists section with new music player
sed -i '' '2588,2680c\
      <!-- ===== REPRODUCTOR DE MÚSICA RAPER - SOLO MÓVIL ===== -->\
      <div class="raper-music-player">\
        <!-- Título principal -->\
        <div class="music-player-header">\
          <h2 class="music-player-title">PLAYLISTS</h2>\
          <div class="music-player-subtitle">\
            <p>Raper playlists</p>\
            <p>Novedades raper music</p>\
          </div>\
        </div>\
\
        <!-- Reproductor principal -->\
        <div class="music-player-card">\
          <!-- Cover del álbum con logo RAPER -->\
          <div class="album-cover-container">\
            <div class="album-cover-raper">\
              <span class="raper-text">RAPER</span>\
            </div>\
          </div>\
\
          <!-- Información del álbum -->\
          <div class="album-info">\
            <h3 class="album-title">The Richlist</h3>\
            <p class="album-artist">RAPER Company</p>\
            <button class="spotify-save-button">\
              <svg class="spotify-icon" viewBox="0 0 24 24" fill="currentColor">\
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>\
              </svg>\
              Guardar en Spotify\
            </button>\
          </div>\
\
          <!-- Controles de reproducción -->\
          <div class="player-controls">\
            <div class="control-buttons-left">\
              <button class="control-button">\
                <svg viewBox="0 0 24 24" fill="currentColor">\
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>\
                </svg>\
              </button>\
              <button class="control-button">\
                <svg viewBox="0 0 24 24" fill="currentColor">\
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>\
                </svg>\
              </button>\
              <button class="control-button">\
                <svg viewBox="0 0 24 24" fill="currentColor">\
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>\
                </svg>\
              </button>\
            </div>\
            <button class="main-play-button">\
              <svg viewBox="0 0 24 24" fill="currentColor">\
                <path d="M8 5v14l11-7z"/>\
              </svg>\
            </button>\
          </div>\
\
          <!-- Lista de canciones -->\
          <div class="track-list">\
            <div class="track-item-player">\
              <span class="track-number-player">1</span>\
              <div class="track-info-player">\
                <span class="track-title-player">Scammer</span>\
                <span class="track-artist-player">RAPER</span>\
              </div>\
              <span class="track-duration-player">02:21</span>\
            </div>\
\
            <div class="track-item-player">\
              <span class="track-number-player">2</span>\
              <div class="track-info-player">\
                <span class="track-title-player">Porno</span>\
                <span class="track-artist-player">Rich Music LTD, Sech, Dalex, Justin Quiles, Le...</span>\
              </div>\
              <span class="track-duration-player">03:32</span>\
            </div>\
\
            <div class="track-item-player">\
              <span class="track-number-player">3</span>\
              <div class="track-info-player">\
                <span class="track-title-player">Ñengo</span>\
                <span class="track-artist-player">RAPER</span>\
              </div>\
              <span class="track-duration-player">02:25</span>\
            </div>\
          </div>\
        </div>\
      </div>
' index.html

echo "✅ HTML actualizado con nuevo reproductor"

# Update CSS timestamp
sed -i '' 's/v=20250624-playlists-new/v=20250624-music-player-final/g' index.html

echo "✅ Timestamp CSS actualizado"

echo "🎵 ¡Reproductor de música RAPER implementado con éxito!"
echo "🔵 Usando colores azules originales: #5fa4ff y #4fd1c5"
echo "📱 Optimizado para móvil únicamente"

