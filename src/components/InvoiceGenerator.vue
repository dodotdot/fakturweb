<template>
  <div class="invoice-generator">
    <div class="tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'edit' }" 
        @click="activeTab = 'edit'"
      >
        Edit Invoice
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'preview' }" 
        @click="activeTab = 'preview'"
      >
        Preview Invoice
      </button>
    </div>

    <div v-if="activeTab === 'edit'" class="edit-panel">
      <div class="card form-section">
        <h2>Invoice Information</h2>
        <div class="form-group">
          <label>Invoice Title</label>
          <input type="text" v-model="invoice.title" placeholder="Invoice #001">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Invoice Date</label>
            <input type="date" v-model="invoice.date">
          </div>
          <div class="form-group">
            <label>Due Date</label>
            <input type="date" v-model="invoice.dueDate">
          </div>
        </div>
      </div>
      
      <div class="card form-section">
        <h2>From (Your Details)</h2>
        <div class="form-group">
          <label>Your Name / Business</label>
          <input type="text" v-model="invoice.from.name" placeholder="Your Name or Business">
        </div>
        <div class="form-group">
          <label>Address</label>
          <textarea v-model="invoice.from.address" placeholder="Your Address"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="invoice.from.email" placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" v-model="invoice.from.phone" placeholder="Your Phone Number">
          </div>
        </div>
      </div>
      
      <div class="card form-section">
        <h2>Bill To (Client Details)</h2>
        <div class="form-group">
          <label>Client Name</label>
          <input type="text" v-model="invoice.to.name" placeholder="Client Name">
        </div>
        <div class="form-group">
          <label>Address</label>
          <textarea v-model="invoice.to.address" placeholder="Client Address"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="invoice.to.email" placeholder="client@email.com">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" v-model="invoice.to.phone" placeholder="Client Phone Number">
          </div>
        </div>
      </div>
      
      <div class="card form-section">
        <h2>Invoice Items</h2>
        <div class="table-responsive">
          <table class="invoice-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index">
                <td>
                  <input type="text" v-model="item.description" placeholder="Item description">
                </td>
                <td>
                  <input type="number" v-model.number="item.quantity" min="1" @input="calculateItemTotal(index)">
                </td>
                <td>
                  <input type="number" v-model.number="item.unitPrice" min="0" step="0.01" @input="calculateItemTotal(index)">
                </td>
                <td>{{ formatCurrency(item.total) }}</td>
                <td>
                  <button class="delete-btn" @click="deleteItem(index)">×</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5">
                  <button class="btn btn-secondary" @click="addItem">+ Add Item</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="invoice-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>{{ formatCurrency(calculateSubtotal()) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax (%):</span>
            <div class="tax-input">
              <input type="number" v-model.number="invoice.taxRate" min="0" max="100">
              <span>{{ formatCurrency(calculateTaxAmount()) }}</span>
            </div>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>{{ formatCurrency(calculateTotal()) }}</span>
          </div>
        </div>
      </div>
      
      <div class="card form-section">
        <h2>Additional Notes</h2>
        <div class="form-group">
          <textarea v-model="invoice.notes" placeholder="Payment terms, thank you note, etc."></textarea>
        </div>
      </div>
      
      <div class="action-buttons" v-if="!storeMode">
        <button class="btn" @click="previewInvoice">Preview Invoice</button>
        <button class="btn btn-secondary" @click="resetForm">Reset Form</button>
      </div>
    </div>

    <div v-if="activeTab === 'preview'" class="preview-panel" ref="previewPanel">
      <div class="invoice-preview card" ref="invoicePreview">
        <!-- Invoice Header -->
        <div class="invoice-header">
          <div class="invoice-title">
            <h2>{{ invoice.title || 'INVOICE' }}</h2>
            <div class="invoice-dates">
              <div><strong>Date:</strong> {{ formatDate(invoice.date) }}</div>
              <div><strong>Due Date:</strong> {{ formatDate(invoice.dueDate) }}</div>
            </div>
          </div>
        </div>
        
        <!-- From/To Details -->
        <div class="invoice-addresses">
          <div class="invoice-from">
            <h3>From:</h3>
            <div class="address-details">
              <div class="name">{{ invoice.from.name }}</div>
              <div class="address">{{ invoice.from.address }}</div>
              <div>{{ invoice.from.email }}</div>
              <div>{{ invoice.from.phone }}</div>
            </div>
          </div>
          
          <div class="invoice-to">
            <h3>Bill To:</h3>
            <div class="address-details">
              <div class="name">{{ invoice.to.name }}</div>
              <div class="address">{{ invoice.to.address }}</div>
              <div>{{ invoice.to.email }}</div>
              <div>{{ invoice.to.phone }}</div>
            </div>
          </div>
        </div>
        
        <!-- Invoice Items -->
        <div class="invoice-items">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index">
                <td>{{ item.description }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.unitPrice) }}</td>
                <td>{{ formatCurrency(item.total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="subtotal">
                <td colspan="3">Subtotal</td>
                <td>{{ formatCurrency(calculateSubtotal()) }}</td>
              </tr>
              <tr class="tax">
                <td colspan="3">Tax ({{ invoice.taxRate }}%)</td>
                <td>{{ formatCurrency(calculateTaxAmount()) }}</td>
              </tr>
              <tr class="total">
                <td colspan="3">Total</td>
                <td>{{ formatCurrency(calculateTotal()) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <!-- Notes -->
        <div class="invoice-notes" v-if="invoice.notes">
          <h3>Notes</h3>
          <p>{{ invoice.notes }}</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="btn" @click="downloadPDF">Download PDF</button>
        <button class="btn btn-secondary" @click="activeTab = 'edit'">Back to Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import html2pdf from 'html2pdf.js';
import { useInvoiceStore } from '../stores/invoice';

const props = defineProps({
  storeMode: {
    type: Boolean,
    default: false
  }
});

const activeTab = ref('edit');
const previewPanel = ref(null);
const invoicePreview = ref(null);

const invoiceStore = useInvoiceStore();

// Initialize invoice data based on store or local state
const localInvoice = reactive({
  title: 'INVOICE #001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  from: {
    name: 'Your Name / Company',
    address: 'Your Address\nCity, State ZIP',
    email: 'your@email.com',
    phone: '(123) 456-7890'
  },
  to: {
    name: 'Client Name',
    address: 'Client Address\nCity, State ZIP',
    email: 'client@email.com',
    phone: '(098) 765-4321'
  },
  items: [
    {
      description: 'Service / Product',
      quantity: 1,
      unitPrice: 100,
      total: 100
    }
  ],
  taxRate: 10,
  notes: 'Payment is due within 30 days. Thank you for your business!'
});

// Use computed to reference either store invoice or local invoice
const invoice = computed(() => {
  if (props.storeMode) {
    return invoiceStore.currentInvoice;
  }
  return localInvoice;
});

// Add a new empty item
function addItem() {
  invoice.value.items.push({
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  });
  if (props.storeMode) {
    invoiceStore.calculateTotals();
  } else {
    calculateTotals();
  }
}

// Delete an item by index
function deleteItem(index) {
  if (invoice.value.items.length > 1) {
    invoice.value.items.splice(index, 1);
    if (props.storeMode) {
      invoiceStore.calculateTotals();
    } else {
      calculateTotals();
    }
  }
}

// Calculate item total
function calculateItemTotal(index) {
  if (props.storeMode) {
    invoiceStore.calculateItemTotal(index);
  } else {
    const item = invoice.value.items[index];
    item.total = item.quantity * item.unitPrice;
    calculateTotals();
  }
}

// Calculate subtotal
function calculateSubtotal() {
  if (props.storeMode) {
    return invoiceStore.subtotal;
  }
  return invoice.value.items.reduce((sum, item) => sum + item.total, 0);
}

// Calculate tax amount
function calculateTaxAmount() {
  if (props.storeMode) {
    return invoiceStore.taxAmount;
  }
  return calculateSubtotal() * (invoice.value.taxRate / 100);
}

// Calculate total with tax
function calculateTotal() {
  if (props.storeMode) {
    return invoiceStore.total;
  }
  return calculateSubtotal() + calculateTaxAmount();
}

// Calculate all totals
function calculateTotals() {
  invoice.value.items.forEach((item, index) => {
    const thisItem = invoice.value.items[index];
    thisItem.total = thisItem.quantity * thisItem.unitPrice;
  });
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Preview invoice
function previewInvoice() {
  activeTab.value = 'preview';
}

// Reset form to default values
function resetForm() {
  if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
    if (props.storeMode) {
      invoiceStore.resetInvoice();
    } else {
      localInvoice.title = 'INVOICE #001';
      localInvoice.date = new Date().toISOString().split('T')[0];
      localInvoice.dueDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
      localInvoice.from = {
        name: 'Your Name / Company',
        address: 'Your Address\nCity, State ZIP',
        email: 'your@email.com',
        phone: '(123) 456-7890'
      };
      localInvoice.to = {
        name: 'Client Name',
        address: 'Client Address\nCity, State ZIP',
        email: 'client@email.com',
        phone: '(098) 765-4321'
      };
      localInvoice.items = [
        {
          description: 'Service / Product',
          quantity: 1,
          unitPrice: 100,
          total: 100
        }
      ];
      localInvoice.taxRate = 10;
      localInvoice.notes = 'Payment is due within 30 days. Thank you for your business!';
    }
  }
}

// Download PDF
function downloadPDF() {
  const element = invoicePreview.value;
  const options = {
    margin: 1,
    filename: `invoice-${invoice.value.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(options).from(element).save();
}

// Watch for changes to taxRate in the form
watch(() => invoice.value.taxRate, (newVal) => {
  if (props.storeMode) {
    invoiceStore.calculateTotals();
  } else {
    calculateTotals();
  }
});

// Calculate initial totals
onMounted(() => {
  if (!props.storeMode) {
    calculateTotals();
  }
});
</script>

<style scoped>
.invoice-generator {
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
}

.tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  padding: 1.25rem 1.25rem;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
}

.tab-btn.active {
  color: hsl(var(--primary));
  border-bottom: 2px solid hsl(var(--primary));
}

.form-section {
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsla(var(--primary), 0.2);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
  }
}

.form-row .form-group {
  flex: 1;
}

.table-responsive {
  overflow-x: auto;
}

.invoice-items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.invoice-items-table th,
.invoice-items-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.invoice-items-table input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.invoice-items-table input:focus {
  outline: none;
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsla(var(--primary), 0.2);
}

.delete-btn {
  background: transparent;
  border: 0;
  color: #ef4444;
  font-size: 1.25rem;
  cursor: pointer;
}

.delete-btn:hover {
  color: #b91c1c;
}

.invoice-summary {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.125rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.tax-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tax-input input {
  width: 4rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: hsl(var(--primary));
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: hsla(var(--primary), 0.9);
}

.btn-secondary {
  background-color: #6b7280;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

/* Preview Styles */
.preview-panel {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.invoice-preview {
  padding: 2rem;
  margin-bottom: 1.5rem;
  background-color: white;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.invoice-title h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.invoice-addresses {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .invoice-addresses {
    flex-direction: row;
  }
}

.invoice-from,
.invoice-to {
  width: 100%;
}

@media (min-width: 768px) {
  .invoice-from,
  .invoice-to {
    width: 50%;
  }
}

.invoice-from h3,
.invoice-to h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.address-details {
  line-height: 1.5;
}

.address-details .name {
  font-weight: 500;
}

.invoice-items table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.invoice-items th {
  padding: 0.75rem;
  text-align: left;
  background-color: #f9fafb;
  font-weight: 500;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.invoice-items td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.invoice-items tfoot tr td {
  padding: 0.75rem;
  text-align: right;
}

.invoice-items tfoot tr.total td {
  font-weight: 700;
  border-top: 2px solid #d1d5db;
  font-size: 1.125rem;
}

.invoice-notes {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.invoice-notes h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .invoice-header {
    flex-direction: column;
  }
}
</style> 