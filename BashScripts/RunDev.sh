set -e

echo "Exporting environment variables for DEV"
export VITE_BACKEND_HOST="http://localhost"
export VITE_BACKEND_PORT="2000"

echo "Installing dependencies"
npm install || { echo "Failed to install dependencies"; exit 1; }

echo "Building application"
npm run build || { echo "Failed to build application"; exit 1; }

echo "Previewing production build"
npm run preview || { echo "Failed to preview application"; exit 1; }