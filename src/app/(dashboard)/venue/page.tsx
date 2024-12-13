import UserAccountNav from "@/components/user-account-nav";
// import { EventsTable } from "@/components/dashboard";
import { VenuesTable } from "@/components/venue-details-table";
// import { SelectVenue } from "@/components/select-venu";

export default function Dashboard({ active }: any) {
  // Dummy data for the promocodes table
  // Dummy data for the venues table
  const dummyVenues = [
    {
      id: 1,
      name: "Convention Center",
      addressLine1: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      capacity: 5000,
      mapsLink: "https://maps.google.com/?q=Convention+Center",
    },
    {
      id: 2,
      name: "Downtown Hall",
      addressLine1: "456 Elm St",
      city: "San Francisco",
      state: "CA",
      capacity: 3000,
      mapsLink: "https://maps.google.com/?q=Downtown+Hall",
    },
    {
      id: 3,
      name: "Grand Ballroom",
      addressLine1: "789 Oak St",
      city: "San Diego",
      state: "CA",
      capacity: 2000,
      mapsLink: "https://maps.google.com/?q=Grand+Ballroom",
    },
    {
      id: 4,
      name: "City Park Pavilion",
      addressLine1: "101 Pine St",
      city: "Sacramento",
      state: "CA",
      capacity: 1000,
      mapsLink: "https://maps.google.com/?q=City+Park+Pavilion",
    },
    {
      id: 5,
      name: "Tech Conference Center",
      addressLine1: "202 Maple St",
      city: "San Jose",
      state: "CA",
      capacity: 2500,
      mapsLink: "https://maps.google.com/?q=Tech+Conference+Center",
    },
    {
      id: 6,
      name: "Beachside Venue",
      addressLine1: "303 Birch St",
      city: "Santa Monica",
      state: "CA",
      capacity: 1500,
      mapsLink: "https://maps.google.com/?q=Beachside+Venue",
    },
    {
      id: 7,
      name: "Riverside Hall",
      addressLine1: "404 Cedar St",
      city: "Fresno",
      state: "CA",
      capacity: 1200,
      mapsLink: "https://maps.google.com/?q=Riverside+Hall",
    },
    {
      id: 8,
      name: "Mountain View Center",
      addressLine1: "505 Walnut St",
      city: "Palo Alto",
      state: "CA",
      capacity: 1800,
      mapsLink: "https://maps.google.com/?q=Mountain+View+Center",
    },
    {
      id: 9,
      name: "Lakefront Pavilion",
      addressLine1: "606 Cherry St",
      city: "Oakland",
      state: "CA",
      capacity: 2200,
      mapsLink: "https://maps.google.com/?q=Lakefront+Pavilion",
    },
    {
      id: 10,
      name: "Urban Loft Venue",
      addressLine1: "707 Spruce St",
      city: "Berkeley",
      state: "CA",
      capacity: 1300,
      mapsLink: "https://maps.google.com/?q=Urban+Loft+Venue",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="venue"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <VenuesTable venues={dummyVenues}></VenuesTable>
      </div>
    </div>
  );
}
