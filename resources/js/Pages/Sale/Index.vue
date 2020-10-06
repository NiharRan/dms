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

              <div v-if="sales.data.length > 0" class="table-responsive">
                <table id="data-table" class="table table-bordered display nowrap mb-0">
                  <thead>
                  <tr>
                    <th colspan="2">
                      <select v-model="search.per_page" @change="searchData" class="form-control">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="25">50</option>
                        <option value="25">100</option>
                      </select>
                    </th>
                    <th colspan="5"></th>
                    <th colspan="2">
                      <input type="text" @keyup="searchData" v-model="search.query" class="form-control" placeholder="Search">
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Invoice</th>
                    <th>Client</th>
                    <th class="text-right">Total Price</th>
                    <th class="text-right">Paid</th>
                    <th class="text-right">Due</th>
                    <th>Sale At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(sale, index) in sales.data" :key="sale.id">
                    <th style="width: 50px">{{ index + 1 }}</th>
                    <th>{{ sale.invoice }}</th>
                    <th style="width: 150px;">
                      {{ sale.client.name }}
                    </th>
                    <th class="text-right">{{ sale.total_price }}</th>
                    <th class="text-right">{{ sale.total_paid }}</th>
                    <th class="text-right">{{ sale.total_due }}</th>
                    <td>{{ sale.sale_date | moment('DD/MM/YYYY hh:mm A') }}</td>
                    <td v-html="$options.filters.status(sale.status)"></td>
                    <td class="text-center">
                      <a :href="route('sales.edit', sale.id)" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                      <a :href="route('sales.invoices.show', sale.invoice)" class="text-primary" role="button"><i class="feather icon-eye"></i></a>
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
  import Layout from "../../Shared/Layout";
  import Model from "../../Components/Model";
  import DataTable from "../../Components/DataTable";

  export default {
        name: "DriverInvoice",
        components: {DataTable, Model, Layout},
        props: {
          sales: Object,
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
            this.$inertia.replace(this.route('sales.index'), {
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
