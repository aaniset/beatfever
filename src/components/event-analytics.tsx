import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AnalyticsComponent = () => {
  // Dummy data for KPIs
  const ticketSalesBreakdown = {
    earlyBird: 150,
    regular: 500,
    vip: 80,
    group: 100,
    lastMinute: 70,
  };

  const revenueBreakdown = {
    ticketSales: 8000,
    merchandise: 1500,
    concessions: 2000,
    sponsorships: 3000,
    upsells: 1000,
  };

  const attendanceMetrics = {
    totalAttendance: 900,
    attendanceByTicketType: {
      vip: 200,
      generalAdmission: 600,
      group: 100,
    },
    attendanceByDemographics: {
      age: {
        under18: 150,
        "18-35": 450,
        "36-50": 250,
        "51+": 50,
      },
      gender: {
        male: 450,
        female: 400,
        other: 50,
      },
      location: {
        local: 600,
        regional: 200,
        international: 100,
      },
    },
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {/* Ticket Sales Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Sales Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(ticketSalesBreakdown).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(revenueBreakdown).map(([key, value]) => (
              <li key={key}>
                {key}: ${value}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Attendance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Total Attendance: {attendanceMetrics.totalAttendance}</div>
          <div>
            Attendance by Ticket Type:
            <ul>
              {Object.entries(attendanceMetrics.attendanceByTicketType).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            Attendance by Demographics:
            <ul>
              {Object.entries(attendanceMetrics.attendanceByDemographics).map(
                ([category, values]) => (
                  <li key={category}>
                    {category}:
                    <ul>
                      {Object.entries(values).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for Additional KPIs */}
      <div />
    </div>
  );
};

export default AnalyticsComponent;
