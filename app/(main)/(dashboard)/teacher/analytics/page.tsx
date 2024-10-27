import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formats";

const Analytics = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales, pendingPayouts } = await getAnalytics(
    userId
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSales} name="Courses" />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard
          label="Your Earnings"
          value={totalRevenue * 0.8}
          shouldFormat
        />
        <DataCard label="Pending Payout" value={pendingPayouts} shouldFormat />
      </div>

      {data.length === 0 ? (
        <Card className="h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </Card>
      ) : (
        <Chart data={data} />
      )}
    </div>
  );
};

export default Analytics;
