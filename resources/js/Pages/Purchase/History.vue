<template>
  <layout name="PurchaseHistory">
    <!-- users list start -->
    <section class="users-list-wrapper">
      <!-- Ag Grid users list section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive">
                <table
                  id="data-table"
                  class="table table-bordered display responsive nowrap mb-0"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                        <th colspan="5" class="text-center">
                            <h1 class="text-success mb-0">{{ stock_details.stock.name }}</h1>
                            <p class="mb-0">{{ stock_details.stock.address }}</p>
                            <span class="badge badge-success">{{ stock_details.product.name }}</span>
                        </th>
                        <th class="text-center">
                            <inertia-link :href="route('stock-details.index')" class="btn btn-primary">{{ __('Back') }}</inertia-link>
                            <inertia-link target="_blank" :href="route('stock-details.history.print', stock_details.id)" class="btn btn-info"><i class="feather icon-printer"></i> {{ __('Print') }}</inertia-link>
                        </th>
                    </tr>
                    <tr>
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __('Purchased At') }}</th>
                      <th class="text-center">{{ __("Quantity") }}</th>
                      <th>{{ __("Ship") }}</th>
                      <th>{{ __("Company") }}</th>
                      <th class="text-center">{{ __("Status") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="stock_details_histories.data.length > 0">
                    <tr
                      v-for="(history, index) in stock_details_histories.data"
                      :key="history.id"
                    >
                      <th>{{ index + 1 }}</th>
                      <td>{{ history.created_at | moment('DD/MM/YYYY') }}</td>
                      <th class="text-center">{{ parseFloat(history.quantity).toFixed(3) }} {{ __('Mg')}}</th>
                      <th>{{ history.ship }}</th>
                      <th>{{ history.company }}</th>
                      <td class="text-center" v-html="$options.filters.status(history.status)"></td>
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
    <!-- users list ends -->
  </layout>
</template>

<script>
import Layout from "../../Shared/Layout";
import Model from "../../Components/Model";
export default {
  name: "PurchaseHistory",
  components: { Model, Layout },
  props: {
    success: String,
    error: String,
    stock_details: Object,
    stock_details_histories: Object,
    errors: Object,
  },
  data: function () {
    return {};
  },
  methods: {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
