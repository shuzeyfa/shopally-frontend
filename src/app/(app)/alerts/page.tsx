"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDeleteAlertMutation, useGetAlertsQuery } from "@/lib/api/alertsApi";
import { useDictionary } from "@/providers/LanguageProvider";

export default function AlertsPage() {
  const dict = useDictionary();
  const { data: alerts = [], isLoading, isError, refetch } = useGetAlertsQuery(undefined, { pollingInterval: 60_000 });
  const [deleteAlert, { isLoading: isDeleting }] = useDeleteAlertMutation();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content">{dict.nav.alerts}</h1>
          <p className="mt-1 text-sm text-content-muted">{dict.priceAlerts.subtitle}</p>
        </div>
        <Link href="/search" className={buttonClasses({ variant: "primary" })}>{dict.search.button}</Link>
      </div>

      {isLoading ? (
        <div className="grid gap-3" aria-label={dict.api.checking}>
          {[0, 1, 2].map((item) => <div key={item} className="h-24 animate-pulse rounded-lg bg-surface-muted" />)}
        </div>
      ) : isError ? (
        <Card className="p-6 text-center">
          <h2 className="font-semibold text-content">{dict.priceAlerts.errorTitle}</h2>
          <p className="mt-1 text-sm text-content-muted">{dict.priceAlerts.errorMessage}</p>
          <button className={`${buttonClasses({ variant: "outline" })} mt-4`} onClick={() => void refetch()}>{dict.search.retry}</button>
        </Card>
      ) : alerts.length === 0 ? (
        <Card className="p-8 text-center">
          <h2 className="font-semibold text-content">{dict.priceAlerts.emptyTitle}</h2>
          <p className="mt-1 text-sm text-content-muted">{dict.priceAlerts.emptySubtitle}</p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {alerts.map((alert) => (
            <Card key={alert.alertId} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium text-content">{alert.productId}</p>
                <p className="mt-1 text-sm text-content-muted">
                  {dict.priceAlerts.target}: {alert.targetPrice.toLocaleString()} {alert.currency}
                </p>
                <p className={`mt-1 text-xs font-medium ${alert.isActive ? "text-accent" : "text-positive"}`}>
                  {alert.isActive ? dict.priceAlerts.active : dict.priceAlerts.triggered}
                  {alert.triggeredPrice ? ` · ${alert.triggeredPrice.toLocaleString()} ${alert.currency}` : ""}
                </p>
              </div>
              <button
                type="button"
                disabled={isDeleting}
                className={buttonClasses({ variant: "outline", size: "sm" })}
                onClick={() => void deleteAlert(alert.alertId)}
              >
                {dict.priceAlerts.delete}
              </button>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
