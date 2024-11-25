export interface EventResponse {
    id: number;
    title: string;
    description?: string;
    eventDate: string; // Use appropriate type based on your date format (string or Date)
    location?: string;
    organizer?: string;
    status?: string;
    createdDate: string; // Use appropriate type based on your date format (string or Date)
}