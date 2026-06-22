<script lang="ts">
  import { onMount } from 'svelte';

  // ============================
  // Invoice Configuration
  // ============================
  const company = {
    name: 'CV Vila Cloud',
    brand: 'Vila Cloud',
    tagline: 'Private Hosting untuk Aplikasi Internal Bisnis',
    address: 'Jakarta, Indonesia',
    email: 'support@vilacloud.id',
    phone: '+62 815-9677-746',
    website: 'vilacloud.id'
  };

  // Pricing: Rp 2.750.000 / tahun
  const yearlyPrice = 2750000;
  const monthlyPrice = Math.round(yearlyPrice / 12); // Rp 229,167
  const twoYearPrice = yearlyPrice * 2; // Rp 5,500,000

  // Invoice Details
  let invoiceNumber = $state('INV-2026-001');
  let invoiceDate = $state(formatDateID(new Date()));
  let dueDate = $state(formatDateID(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))); // +14 days
  let periodStart = $state('1 Juli 2026');
  let periodEnd = $state('30 Juni 2027');

  // Client
  let clientName = $state('PT Sparks Education Indonesia');
  let clientAddress = $state('Jakarta, Indonesia');
  let clientEmail = $state('finance@sparkspreschool.id');
  let clientPhone = $state('');

  // Billing Type
  type BillingCycle = 'monthly' | 'yearly' | '2year';
  let billingCycle: BillingCycle = $state('yearly');

  // Line Items
  interface LineItem {
    description: string;
    detail: string;
    qty: number;
    unitPrice: number;
  }

  let items: LineItem[] = $state([
    {
      description: 'Private App Hosting — Paket Internal App',
      detail: 'Employee Portal, Database, SSL, Backup, Monitoring, Maintenance',
      qty: 1,
      unitPrice: yearlyPrice
    }
  ]);

  // Notes
  let notes = $state('Pembayaran melalui transfer bank ke rekening CV Vila Cloud.\nInvoice ini berlaku sebagai bukti tagihan resmi.');

  // Computed
  let subtotal = $derived(items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0));
  let total = $derived(subtotal);

  // Editing mode
  let isEditing = $state(true);

  function formatDateID(date: Date): string {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }

  function updateBillingCycle() {
    if (items.length > 0) {
      switch (billingCycle) {
        case 'monthly':
          items[0].unitPrice = monthlyPrice;
          items[0].qty = 1;
          break;
        case 'yearly':
          items[0].unitPrice = yearlyPrice;
          items[0].qty = 1;
          break;
        case '2year':
          items[0].unitPrice = twoYearPrice;
          items[0].qty = 1;
          break;
      }
    }
  }

  function handlePrint() {
    isEditing = false;
    setTimeout(() => window.print(), 200);
  }

  function addItem() {
    items = [...items, { description: '', detail: '', qty: 1, unitPrice: 0 }];
  }

  function removeItem(index: number) {
    items = items.filter((_, i) => i !== index);
  }

  // Watch billing cycle
  $effect(() => {
    billingCycle;
    updateBillingCycle();
  });
</script>

<svelte:head>
  <title>Invoice {invoiceNumber} — Vila Cloud</title>
</svelte:head>

<!-- Controls (hidden when printing) -->
{#if isEditing}
<div class="controls no-print">
  <div class="controls-inner">
    <div class="controls-header">
      <div class="controls-brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
        <span>Vila Cloud Invoice Generator</span>
      </div>
      <button class="btn-print" onclick={handlePrint}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Cetak / Print
      </button>
    </div>

    <div class="controls-grid">
      <div class="control-group">
        <label>No. Invoice</label>
        <input type="text" bind:value={invoiceNumber} />
      </div>
      <div class="control-group">
        <label>Tanggal</label>
        <input type="text" bind:value={invoiceDate} />
      </div>
      <div class="control-group">
        <label>Jatuh Tempo</label>
        <input type="text" bind:value={dueDate} />
      </div>
      <div class="control-group">
        <label>Siklus Bayar</label>
        <select bind:value={billingCycle}>
          <option value="monthly">Bulanan — {formatRupiah(monthlyPrice)}/bln</option>
          <option value="yearly">Tahunan — {formatRupiah(yearlyPrice)}/thn</option>
          <option value="2year">2 Tahun — {formatRupiah(twoYearPrice)}</option>
        </select>
      </div>
    </div>

    <div class="controls-grid">
      <div class="control-group">
        <label>Nama Klien</label>
        <input type="text" bind:value={clientName} />
      </div>
      <div class="control-group">
        <label>Alamat Klien</label>
        <input type="text" bind:value={clientAddress} />
      </div>
      <div class="control-group">
        <label>Email Klien</label>
        <input type="text" bind:value={clientEmail} />
      </div>
      <div class="control-group">
        <label>Periode</label>
        <input type="text" bind:value={periodStart} placeholder="Mulai" />
        <input type="text" bind:value={periodEnd} placeholder="Selesai" style="margin-top: 6px;" />
      </div>
    </div>
  </div>
</div>
{/if}

<!-- Invoice Document -->
<div class="invoice-page">
  <div class="invoice-paper">

    <!-- Header -->
    <header class="invoice-header">
      <div class="header-left">
        <div class="brand-mark">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
          <div>
            <h1 class="brand-name">{company.brand}</h1>
            <p class="brand-tagline">{company.tagline}</p>
          </div>
        </div>
        <div class="company-details">
          <p>{company.name}</p>
          <p>{company.address}</p>
          <p>{company.email}</p>
          <p>{company.phone}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="invoice-badge">INVOICE</div>
        <table class="invoice-meta">
          <tbody>
            <tr><td class="meta-label">No. Invoice</td><td class="meta-value">{invoiceNumber}</td></tr>
            <tr><td class="meta-label">Tanggal</td><td class="meta-value">{invoiceDate}</td></tr>
            <tr><td class="meta-label">Jatuh Tempo</td><td class="meta-value">{dueDate}</td></tr>
            <tr><td class="meta-label">Periode</td><td class="meta-value">{periodStart} — {periodEnd}</td></tr>
          </tbody>
        </table>
      </div>
    </header>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Billing To -->
    <section class="billing-section">
      <div class="billing-to">
        <h3 class="billing-label">Ditagihkan Kepada:</h3>
        <p class="billing-name">{clientName}</p>
        <p class="billing-info">{clientAddress}</p>
        <p class="billing-info">{clientEmail}</p>
        {#if clientPhone}
          <p class="billing-info">{clientPhone}</p>
        {/if}
      </div>
      <div class="billing-status">
        <span class="status-badge">BELUM DIBAYAR</span>
      </div>
    </section>

    <!-- Items Table -->
    <section class="items-section">
      <table class="items-table">
        <thead>
          <tr>
            <th class="th-no">No</th>
            <th class="th-desc">Deskripsi Layanan</th>
            <th class="th-qty">Qty</th>
            <th class="th-price">Harga Satuan</th>
            <th class="th-total">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {#each items as item, i}
            <tr>
              <td class="td-no">{i + 1}</td>
              <td class="td-desc">
                <span class="item-title">{item.description}</span>
                {#if item.detail}
                  <span class="item-detail">{item.detail}</span>
                {/if}
              </td>
              <td class="td-qty">{item.qty}</td>
              <td class="td-price">{formatRupiah(item.unitPrice)}</td>
              <td class="td-total">{formatRupiah(item.qty * item.unitPrice)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>

    <!-- Totals -->
    <section class="totals-section">
      <div class="totals-note">
        {#if billingCycle === 'yearly'}
          <p class="note-highlight">Setara {formatRupiah(monthlyPrice)}/bulan</p>
        {:else if billingCycle === '2year'}
          <p class="note-highlight">Setara {formatRupiah(Math.round(twoYearPrice / 24))}/bulan</p>
        {/if}
      </div>
      <table class="totals-table">
        <tbody>
          <tr>
            <td class="totals-label">Subtotal</td>
            <td class="totals-value">{formatRupiah(subtotal)}</td>
          </tr>
          <tr>
            <td class="totals-label">Pajak</td>
            <td class="totals-value">—</td>
          </tr>
          <tr class="totals-grand">
            <td class="totals-label">Total</td>
            <td class="totals-value">{formatRupiah(total)}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Payment Info -->
    <section class="payment-section">
      <div class="payment-box">
        <h3 class="payment-title">Informasi Pembayaran</h3>
        <div class="payment-grid">
          <div>
            <p class="payment-label">Bank</p>
            <p class="payment-value">BCA</p>
          </div>
          <div>
            <p class="payment-label">No. Rekening</p>
            <p class="payment-value">XXX-XXXX-XXX</p>
          </div>
          <div>
            <p class="payment-label">Atas Nama</p>
            <p class="payment-value">{company.name}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Notes -->
    {#if notes}
      <section class="notes-section">
        <h3 class="notes-title">Catatan</h3>
        <p class="notes-text">{notes}</p>
      </section>
    {/if}

    <!-- Footer -->
    <footer class="invoice-footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <p>Terima kasih telah mempercayakan infrastruktur Anda kepada <strong>{company.brand}</strong></p>
        <p class="footer-url">{company.website}</p>
      </div>
    </footer>

  </div>
</div>

<!-- Back to editing button (shown after print) -->
{#if !isEditing}
  <div class="back-controls no-print">
    <button class="btn-back" onclick={() => isEditing = true}>
      ← Kembali ke Editor
    </button>
  </div>
{/if}

<style>
  /* ================================
     Print Styles
     ================================ */
  @media print {
    .no-print {
      display: none !important;
    }

    .invoice-page {
      padding: 0;
      background: white;
    }

    .invoice-paper {
      box-shadow: none;
      border: none;
      padding: 40px;
    }
  }

  /* ================================
     Page Reset for Invoice
     ================================ */
  :global(body) {
    background: #f0f2f5;
  }

  /* ================================
     Controls Panel
     ================================ */
  .controls {
    background: #0D1321;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 24px;
  }

  .controls-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .controls-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    font-family: var(--font-sans, 'Geist', system-ui, sans-serif);
  }

  .btn-print {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #10B981;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }

  .btn-print:hover {
    background: #059669;
  }

  .controls-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 12px;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .control-group label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .control-group input,
  .control-group select {
    padding: 8px 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #fff;
    font-size: 0.875rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }

  .control-group input:focus,
  .control-group select:focus {
    border-color: #10B981;
  }

  .control-group select option {
    background: #1a1f2e;
  }

  /* ================================
     Invoice Page
     ================================ */
  .invoice-page {
    padding: 40px 24px;
    display: flex;
    justify-content: center;
    font-family: var(--font-sans, 'Geist', system-ui, -apple-system, sans-serif);
  }

  .invoice-paper {
    width: 100%;
    max-width: 900px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
    padding: 56px;
    color: #1e293b;
  }

  /* ================================
     Header
     ================================ */
  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .brand-mark {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .brand-name {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .brand-tagline {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }

  .company-details {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.6;
  }

  .company-details p {
    margin: 0;
  }

  .header-right {
    text-align: right;
  }

  .invoice-badge {
    font-size: 2rem;
    font-weight: 900;
    color: #10B981;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  .invoice-meta {
    border-collapse: collapse;
    font-size: 0.8rem;
  }

  .invoice-meta td {
    padding: 3px 0;
  }

  .meta-label {
    color: #94a3b8;
    padding-right: 16px;
    text-align: right;
    white-space: nowrap;
  }

  .meta-value {
    color: #334155;
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
  }

  /* ================================
     Divider
     ================================ */
  .divider {
    height: 2px;
    background: linear-gradient(to right, #10B981, #06b6d4, #8b5cf6);
    border-radius: 999px;
    margin: 28px 0;
    opacity: 0.7;
  }

  /* ================================
     Billing Section
     ================================ */
  .billing-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  .billing-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .billing-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
  }

  .billing-info {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }

  .status-badge {
    display: inline-block;
    padding: 6px 16px;
    background: #FEF3C7;
    color: #B45309;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    border-radius: 6px;
  }

  /* ================================
     Items Table
     ================================ */
  .items-section {
    margin-bottom: 24px;
  }

  .items-table {
    width: 100%;
    border-collapse: collapse;
  }

  .items-table thead tr {
    background: #0f172a;
  }

  .items-table th {
    padding: 12px 16px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: #fff;
    text-align: left;
  }

  .th-no { width: 50px; text-align: center; border-radius: 8px 0 0 0; }
  .th-qty { width: 60px; text-align: center; }
  .th-price { width: 160px; text-align: right; }
  .th-total { width: 160px; text-align: right; border-radius: 0 8px 0 0; }

  .items-table tbody tr {
    border-bottom: 1px solid #e2e8f0;
  }

  .items-table tbody tr:last-child {
    border-bottom: 2px solid #cbd5e1;
  }

  .items-table td {
    padding: 16px;
    font-size: 0.875rem;
    vertical-align: top;
  }

  .td-no { text-align: center; color: #94a3b8; font-weight: 600; }
  .td-qty { text-align: center; }
  .td-price { text-align: right; white-space: nowrap; }
  .td-total { text-align: right; font-weight: 700; color: #0f172a; white-space: nowrap; }

  .item-title {
    display: block;
    font-weight: 600;
    color: #0f172a;
  }

  .item-detail {
    display: block;
    font-size: 0.8rem;
    color: #94a3b8;
    margin-top: 4px;
  }

  /* ================================
     Totals
     ================================ */
  .totals-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
  }

  .totals-note {
    flex: 1;
  }

  .note-highlight {
    display: inline-block;
    padding: 6px 14px;
    background: #ecfdf5;
    color: #047857;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    margin: 0;
  }

  .totals-table {
    border-collapse: collapse;
    min-width: 280px;
  }

  .totals-table td {
    padding: 6px 0;
    font-size: 0.875rem;
  }

  .totals-label {
    color: #64748b;
    padding-right: 32px;
    text-align: right;
  }

  .totals-value {
    text-align: right;
    font-weight: 600;
    color: #334155;
    white-space: nowrap;
  }

  .totals-grand {
    border-top: 2px solid #0f172a;
  }

  .totals-grand .totals-label {
    color: #0f172a;
    font-weight: 800;
    font-size: 1rem;
    padding-top: 10px;
  }

  .totals-grand .totals-value {
    color: #10B981;
    font-weight: 800;
    font-size: 1.2rem;
    padding-top: 10px;
  }

  /* ================================
     Payment Info
     ================================ */
  .payment-section {
    margin-bottom: 24px;
  }

  .payment-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 20px 24px;
  }

  .payment-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
    font-weight: 700;
    margin: 0 0 12px;
  }

  .payment-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .payment-label {
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0 0 2px;
  }

  .payment-value {
    font-size: 0.9rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  /* ================================
     Notes
     ================================ */
  .notes-section {
    margin-bottom: 32px;
  }

  .notes-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .notes-text {
    font-size: 0.825rem;
    color: #64748b;
    line-height: 1.6;
    white-space: pre-line;
    margin: 0;
  }

  /* ================================
     Footer
     ================================ */
  .invoice-footer {
    margin-top: 40px;
  }

  .footer-line {
    height: 1px;
    background: #e2e8f0;
    margin-bottom: 16px;
  }

  .footer-content {
    text-align: center;
  }

  .footer-content p {
    margin: 0;
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .footer-url {
    color: #10B981;
    font-weight: 600;
    margin-top: 4px;
  }

  /* ================================
     Back Button
     ================================ */
  .back-controls {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }

  .btn-back {
    padding: 12px 24px;
    background: #0f172a;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transition: background 0.2s;
  }

  .btn-back:hover {
    background: #1e293b;
  }

  /* ================================
     Responsive
     ================================ */
  @media (max-width: 768px) {
    .controls-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .invoice-paper {
      padding: 32px 24px;
    }

    .invoice-header {
      flex-direction: column;
      gap: 20px;
    }

    .header-right {
      text-align: left;
    }

    .meta-label {
      text-align: left;
    }

    .billing-section {
      flex-direction: column;
      gap: 12px;
    }

    .totals-section {
      flex-direction: column;
      gap: 16px;
    }

    .payment-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
