<template>
  <layout name="DriverInvoice">
    <!-- product list start -->
    <section class="users-list-wrapper">
      <!-- product section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div v-if="driver_invoices.data.length > 0">
                <table id="data-table" class="table table-responsive table-bordered mb-0">
                  <thead>
                  <tr>
                    <th colspan="2">
                      <select v-model="search.per_page" @change="searchData" class="form-control">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </th>
                    <th colspan="6"></th>
                    <th colspan="3">
                      <input type="text" @keyup="searchData" v-model="search.query" class="form-control" placeholder="Search">
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Client</th>
                    <th>Driver</th>
                    <th>Quantity</th>
                    <th class="text-right">Amount</th>
                    <th class="text-right">Track Rent</th>
                    <th class="text-right">Others</th>
                    <th>Total</th>
                    <th>Invoice At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody class="font-small-3">
                  <tr v-for="(driver_invoice, index) in driver_invoices.data" :key="driver_invoice.id">
                    <th style="width: 50px">{{ index + 1 }}</th>
                    <td style="width: 150px;">
                      {{ driver_invoice.client.name }}
                    </td>
                    <td>
                      {{ driver_invoice.driver_name }}
                    </td>
                    <td style="width: 150px;">
                      {{ driver_invoice.quantity }}
                    </td>
                    <td class="text-right">{{ driver_invoice.amount }}</td>
                    <td class="text-right">{{ driver_invoice.track_rent }}</td>
                    <td class="text-right">{{ driver_invoice.others }}</td>
                    <td class="text-right">{{ driver_invoice.total }}</td>
                    <td>{{ driver_invoice.created_at | moment('DD/MM/YYYY') }}</td>
                    <td v-html="$options.filters.status(driver_invoice.status)"></td>
                    <td class="text-center">
                      <inertia-link :href="route('drivers.invoices.show', driver_invoice.invoice)" class="text-primary"><i class="feather icon-eye"></i></inertia-link>
                      <inertia-link :href="route('drivers.invoices.edit', driver_invoice.id)" class="text-info" role="button"><i class="feather icon-edit"></i></inertia-link>
                      <inertia-link href="" class="text-warning" role="button"><i class="feather icon-trash"></i></inertia-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
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
  import Model from "../../../Components/Model";

  export default {
        name: "DriverInvoice",
        components: {Model, Layout},
        props: {
          driver_invoices: Object,
          success: String
        },
        data: function () {
          return {
            search: {
              per_page: 10,
              query: ''
            }
          }
        },
        methods: {

          searchData: function () {
            this.$inertia.replace(this.route('drivers.invoices.index'), {
              method: 'get',
              data: {
                search: this.search.query,
                per_page: this.search.per_page,
              },
              preserveState: true,
              preserveScroll: true,
            });
          },
        },
        created() {
          this.searchData();
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
