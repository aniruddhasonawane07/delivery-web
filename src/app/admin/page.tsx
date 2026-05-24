import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card/Card';
import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <Card>
          <CardContent className={styles.statCard}>
            <h3>Total Orders</h3>
            <p className={styles.statValue}>156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>₹ 4,50,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={styles.statCard}>
            <h3>Active Products</h3>
            <p className={styles.statValue}>42</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={styles.statCard}>
            <h3>Pending Orders</h3>
            <p className={styles.statValue}>12</p>
          </CardContent>
        </Card>
      </div>

      <div className={styles.recentOrders}>
        <h2>Recent Orders</h2>
        <Card>
          <CardContent>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>John Doe</td>
                  <td>₹ 1,500</td>
                  <td><span className={styles.badgePending}>Pending</span></td>
                  <td>2023-10-25</td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>Jane Smith</td>
                  <td>₹ 3,200</td>
                  <td><span className={styles.badgeSuccess}>Delivered</span></td>
                  <td>2023-10-24</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
