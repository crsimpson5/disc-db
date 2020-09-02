const src = process.env.NODE_ENV === "production"
  ? "https://disc-db-images.s3.us-east-2.amazonaws.com/"
  : "/images/";

export default src;
