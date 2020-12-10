<template>
  <layout name="PaymentHistory">
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
                      <th colspan="4" class="text-center">
                        <h1 class="text-success mb-0">{{ client.name }}</h1>
                        <p class="mb-0">{{ client.address }}</p>
                        <span class="badge badge-success">{{
                          client.phone
                        }}</span>
                      </th>
                      <th class="text-center" width="25%">
                        <inertia-link
                          :href="route('clients.index')"
                          class="btn btn-md btn-primary"
                          >{{ __("Back") }}</inertia-link
                        >
                        <inertia-link
                          target="_blank"
                          :href="
                            route('client-balances.history.print', client.id)
                          "
                          class="btn btn-md btn-info"
                          ><i class="feather icon-printer"></i>
                          {{ __("Print") }}</inertia-link
                        >
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __("Created At") }}</th>
                      <th>{{ __("Description") }}</th>
                      <th class="text-center">{{ __("Type") }}</th>
                      <th class="text-right">{{ __("Amount") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="balance_histories.data.length > 0">
                    <tr>
                      <td colspan="3" class="text-right">{{ __("Total") }}</td>
                      <th></th>
                      <th class="text-right">
                        {{ total(balance_histories.data) }}
                      </th>
                    </tr>
                    <tr
                      v-for="(history, index) in balance_histories.data"
                      :key="history.id"
                    >
                      <th>{{ index + 1 }}</th>
                      <td>{{ history.created_at | moment("DD/MM/YYYY") }}</td>
                      <th>{{ history.description }}</th>
                      <th class="text-center">{{ history.type }}</th>
                      <th class="text-right">
                        {{ parseFloat(history.amount).toFixed(2) }}
                      </th>
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
  name: "PaymentHistory",
  components: { Model, Layout },
  props: {
    success: String,
    error: String,
    client: Object,
    balance_histories: Object,
    errors: Object,
  },
  data: function () {
    return {};
  },
  methods: {
    total: function (data) {
      let totalAmount = data.reduce((total, history) => {
        let amount = parseFloat(history.amount);
        if (history.type == "In") total += amount;
        else total -= amount;
        return total;
      }, 0);
      return parseFloat(totalAmount).toFixed(2);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
