'use client';
import React, { useState } from 'react';

type Summary = {
  totalBelanja: number;
  totalTunai: number;
  totalNonTunai: number;
  totalVoucher: number;
  totalKembalian: number;
  kas: number;
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const json = JSON.parse(text);

    // Parsing sesuai struktur file JSON Anda
    const totalBelanja = json.TotalGrossRpBarangJual || 0;
    const totalTunai = json.TotalDibayarRpTunai || 0;
    const totalNonTunai = json.TotalDibayarRpNonTunai || 0;
    const totalVoucher = json.TotalDibayarRpVoucher || 0;
    const totalKembalian = json.TotalKembalianRp || 0;
    const kas = totalTunai - totalKembalian;

    setData(json);
    setSummary({
      totalBelanja,
      totalTunai,
      totalNonTunai,
      totalVoucher,
      totalKembalian,
      kas,
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Upload File POS JSON</h2>
      <input type="file" accept=".json,.*" onChange={handleFile} />
      {summary && (
        <div style={{ marginTop: 24 }}>
          <h3>Summary</h3>
          <table border={1} cellPadding={8}>
            <tbody>
              <tr>
                <td>Total Belanja</td>
                <td>Rp {summary.totalBelanja.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Tunai</td>
                <td>Rp {summary.totalTunai.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Non Tunai</td>
                <td>Rp {summary.totalNonTunai.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Voucher</td>
                <td>Rp {summary.totalVoucher.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Kembalian</td>
                <td>Rp {summary.totalKembalian.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Kas</td>
                <td>Rp {summary.kas.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Tampilkan detail transaksi jika perlu */}
    </div>
  );
}