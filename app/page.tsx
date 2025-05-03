'use client';
import React, { useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const json = JSON.parse(text);
    setData(json);
  };

  // Ambil array transaksi
  const transaksi = data?.KumpulanBarangJual?.DaftarBarangJual || [];

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif', background: '#f6f8fa', minHeight: '100vh' }}>
      <h2 style={{ color: '#1976d2' }}>Upload File POS JSON</h2>
      <input type="file" accept=".json,.*" onChange={handleFile} style={{ marginBottom: 24 }} />

      {transaksi.length > 0 && (
        <div>
          <h3 style={{ color: '#1976d2' }}>Daftar Transaksi</h3>
          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <thead>
              <tr style={{ background: '#1976d2', color: '#fff' }}>
                <th style={{ padding: 8 }}>No</th>
                <th style={{ padding: 8 }}>PLU</th>
                <th style={{ padding: 8 }}>Nama Barang</th>
                <th style={{ padding: 8 }}>Qty</th>
                <th style={{ padding: 8 }}>Harga Jual</th>
                <th style={{ padding: 8 }}>Gross</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item: any, idx: number) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 8 }}>{idx + 1}</td>
                  <td style={{ padding: 8 }}>{item.PLU}</td>
                  <td style={{ padding: 8 }}>{item.Singkatan || item.Desc2}</td>
                  <td style={{ padding: 8 }}>{item.Qty}</td>
                  <td style={{ padding: 8 }}>Rp {item.HargaJualRp?.toLocaleString()}</td>
                  <td style={{ padding: 8 }}>Rp {item.GrossRp?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {data && (
        <div style={{
          marginTop: 32,
          background: '#e3f2fd',
          padding: 16,
          borderRadius: 8,
          maxWidth: 400
        }}>
          <h4 style={{ color: '#1976d2' }}>Summary</h4>
          <div>Total Belanja: <b>Rp {data.TotalGrossRpBarangJual?.toLocaleString()}</b></div>
          <div>Total Tunai: <b>Rp {data.TotalDibayarRpTunai?.toLocaleString()}</b></div>
          <div>Total Non Tunai: <b>Rp {data.TotalDibayarRpNonTunai?.toLocaleString()}</b></div>
          <div>Total Voucher: <b>Rp {data.TotalDibayarRpVoucher?.toLocaleString()}</b></div>
          <div>Total Kembalian: <b>Rp {data.TotalKembalianRp?.toLocaleString()}</b></div>
          <div>Kas: <b>Rp {(data.TotalDibayarRpTunai - data.TotalKembalianRp)?.toLocaleString()}</b></div>
        </div>
      )}
    </div>
  );
}
