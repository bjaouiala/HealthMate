export interface EventRequest {
    id?: number;
    title: string;
    description?: string;
    eventDate: string; // Use appropriate type based on your date format (string or Date)
    createdDate: string; // Use appropriate type based on your date format (string or Date)
    location: string;
    organizer: string;
    status: string; // Adjust type if you have specific status values
}
