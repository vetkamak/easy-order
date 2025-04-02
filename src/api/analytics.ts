import type { AnalyticsData } from '@/src/models';

export function sendAnalytics(analyticsData: AnalyticsData) {
    return new Promise(resolve => {
        console.log(analyticsData);

        resolve({
            ok: true,
            status: 200,
        });
    });
}
