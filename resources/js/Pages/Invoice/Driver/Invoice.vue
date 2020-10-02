<template>
  <layout name="DriverInvoiceShow">
    <!-- product list start -->
    <section class="users-list-wrapper">
      <!-- product section start -->
      <div id="basic-examples">
        <div v-if="success" class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="alert alert-success">
                {{ success }}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <ul  class="activity-timeline timeline-left list-unstyled">
                <li>
                  <div class="timeline-icon bg-gradient-success">
                    <i class="feather font-medium-2 icon-plus-circle"></i>
                  </div>
                  <div class="timeline-info">
                    <h3 class="font-weight-bold">Create Invoice</h3>
                    <p class="font-small-3 mb-1">Created on {{ driver_invoice.created_at | moment('DD-MM-YY HH:mm A') }}</p>
                    <inertia-link
                      class="btn btn-info"
                      :href="route('drivers.invoices.edit', driver_invoice.invoice)">
                      Edit
                    </inertia-link>
                  </div>
                </li>

                <li>
                  <div class="timeline-icon bg-gradient-primary">
                    <i class="fa fa-money font-medium-2"></i>
                  </div>
                  <div class="timeline-info">
                    <h3 class="font-weight-bold">Get Paid</h3>
                    <p class="font-small-3 mb-1">Status {{ driver_invoice.status === 0 ? 'Awaiting payment' : 'Payment done' }}</p>
                    <inertia-link
                      v-if="driver_invoice.status === 0"
                      class="btn btn-primary"
                      :href="route('drivers.invoices.edit', driver_invoice.invoice)">
                      Mark Paid
                    </inertia-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="card-header bg-gradient-success">
              <h2 class="card-title mb-1 text-white">Invoice: {{ driver_invoice.invoice }}</h2>
            </div>
            <div class="card-body">

            </div>
          </div>
        </div>
      </div>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- product type list ends -->
  </layout>
</template>

<script>
  import Layout from "../../../Shared/Layout";

  export default {
    name: "DriverInvoiceShow",
    components: {Layout},
    props: {
      success: String,
      driver_invoice: Object,
    },
    data: function () {
      return {

      }
    },
    methods: {

    },
    created() {

    }
  }
</script>
<style>

</style>
