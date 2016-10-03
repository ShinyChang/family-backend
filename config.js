const config = {
  is_production: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3001,
  gcp_project_id: process.env.GCP_PROJECT_ID || 'family-144002',
  gcp_bucket_name: process.env.GCP_BUCKET_NAME || 'shiny-bucket',
  gcp_key_filename: process.env.GCP_KEY_FILENAME || 'family-faaac59f75d5.json',
  jwt_secret: process.env.JWT_SECRET || '851fb29ce7b9b38924aaf86f7d2917050bf27f19',
  jwt_issuer: 'Shiny'
};

module.exports = config;
