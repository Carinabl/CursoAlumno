#!/bin/sh
# Reemplazar variables en el JavaScript compilado
API_URL=${REACT_APP_API_URL:-http://backend:8080}
find /usr/share/nginx/html -name '*.js' -exec sed -i 's|http://localhost:8080|'"$API_URL"'|g' {} \;

# Iniciar Nginx
exec nginx -g 'daemon off;'