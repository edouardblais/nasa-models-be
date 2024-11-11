export interface CMRResponse {
  feed: {
    entry: Granule[];
  };
}

export interface Granule {
  id: string; // Unique identifier for the granule
  title: string; // Title of the granule
  link: Link[]; // Array of links associated with the granule
  // Add more fields as necessary based on your API response
}

export interface Link {
  rel: string; // Relationship of the link
  href: string; // URL of the link
  type: string; // MIME type of the link
}

// Define a type for the bounding box query parameters
export interface BoundingBoxParams {
  west: string;
  south: string;
  east: string;
  north: string;
}
