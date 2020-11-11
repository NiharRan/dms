<template>
  <layout name="DriverInvoiceCreate">
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

              <form @submit.prevent="store">
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label
                      >{{ __("Client")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <multi-select
                      v-model="form.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '']"
                      @select="showInfo"
                      label="name"
                      track-by="name"
                      :placeholder="__('Select Client')"
                    ></multi-select>

                    <span
                      v-if="errors.client_id"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __("Client Contact No.") }}</label>
                    <input
                      type="text"
                      v-model="form.phone"
                      readonly
                      :placeholder="__('Client Contact No.')"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __("Client Address") }}</label>
                    <input
                      type="text"
                      v-model="form.address"
                      readonly
                      :placeholder="__('Client Address')"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label
                      >{{ __("Driver Name")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="form.driver_name"
                      :class="[errors.driver_name ? 'in-invalid' : '']"
                      :placeholder="__('Driver Name')"
                      class="form-control"
                    />

                    <span
                      v-if="errors.driver_name"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.driver_name[0] }}</strong>
                    </span>
                  </div>

                  <div class="col-md-4 col-12">
                    <label
                      >{{ __("Track Number")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="form.track_no"
                      :class="[errors.track_no ? 'in-invalid' : '']"
                      :placeholder="__('Track Number')"
                      class="form-control"
                    />

                    <span
                      v-if="errors.track_no"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.track_no[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label
                      >{{ __("Driver Contact No.")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="form.driver_phone"
                      :class="[errors.driver_phone ? 'in-invalid' : '']"
                      :placeholder="__('Driver Contact No.')"
                      class="form-control"
                    />

                    <span
                      v-if="errors.driver_phone"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.driver_phone[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <table class="table table-bordered table-responsive-sm">
                    <tr>
                      <th>
                        <multi-select
                          v-model="form.product"
                          :options="products"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Product')"
                        ></multi-select>
                      </th>
                      <th>
                        <multi-select
                          v-model="form.measurement_type"
                          :options="measurement_types"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Measurement Type')"
                        ></multi-select>
                        <span
                          v-if="errors.measurement_type_id"
                          class="invalid-feedback"
                          style="display: block"
                          role="alert"
                        >
                          <strong>{{ errors.measurement_type_id[0] }}</strong>
                        </span>
                      </th>
                      <th style="width: 25%">
                        <div
                          class="row"
                          v-if="
                            form.measurement_type &&
                            form.measurement_type.id === 2
                          "
                        >
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="form.container_height"
                              :placeholder="__('Height')"
                              class="form-control"
                            />
                          </div>
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="form.container_length"
                              :placeholder="__('Length')"
                              class="form-control"
                            />
                          </div>
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="form.container_breadth"
                              :placeholder="__('Breadth')"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <input
                          type="text"
                          v-model="form.quantity"
                          class="form-control"
                          :placeholder="__('Quantity')"
                        />
                        <span
                          v-if="errors.quantity"
                          class="invalid-feedback"
                          style="display: block"
                          role="alert"
                        >
                          <strong>{{ errors.quantity[0] }}</strong>
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Rent") }}</th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.track_rent"
                          @keyup="calculateTotal"
                          :placeholder="__('Rent')"
                        />
                        <span
                          v-if="errors.track_rent"
                          class="invalid-feedback"
                          style="display: block"
                          role="alert"
                        >
                          <strong>{{ errors.track_rent[0] }}</strong>
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Others") }}</th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.others"
                          @keyup="calculateTotal"
                        />
                      </th>
                    </tr>

                    <tr>
                      <th colspan="3" class="text-right">{{ __("Total") }}</th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="form.total"
                          :placeholder="__('Total')"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Paid") }}</th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          @keyup="calculateDue"
                          v-model="form.paid"
                          :placeholder="__('Paid')"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Due") }}</th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="form.due"
                          :placeholder="__('Due')"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        {{ __("Transaction Media") }}
                        <strong class="text-danger">*</strong>
                      </th>
                      <th>
                        <multi-select
                          v-model="form.transaction_media"
                          :options="transaction_medias"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Transaction Media')"
                        ></multi-select>
                        <span
                          v-if="errors.transaction_media_id"
                          class="invalid-feedback"
                          style="display: block"
                          role="alert"
                        >
                          <strong>{{ errors.transaction_media_id[0] }}</strong>
                        </span>
                      </th>
                      <th colspan="2">
                        <input
                          type="text"
                          v-model="form.description"
                          class="form-control"
                          :placeholder="__('Description')"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colspan="6" class="text-right">
                        <inertia-link :href="route('drivers.invoices.index')" class="btn btn-primary">
                          <i class="feather icon-arrow-left"></i> {{ __("Back") }}
                        </inertia-link>
                        <button type="submit" class="btn btn-success">
                          <i class="feather icon-printer"></i> {{ __("Store") }}
                        </button>
                      </th>
                    </tr>
                  </table>
                </div>
              </form>
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
  name: "DriverInvoiceCreate",
  components: { Model, Layout },
  props: {
    success: String,
    clients: Array,
    products: Array,
    measurement_types: Array,
    transaction_medias: Array,
    company: Object,
    load: Object,
    errors: Object,
  },
  data: function () {
    return {
      form: {
        id: "",
        company: null,
        client: null,
        transaction_media: null,
        load: null,
        phone: "",
        address: "",
        product: null,
        quantity: "",
        measurement_type: "",
        container_height: "",
        container_length: "",
        container_breadth: "",
        driver_name: "",
        track_no: "",
        driver_phone: "",
        others: "",
        track_rent: "",
        total: "",
        paid: "",
        due: "",
        description: "",
      },
    };
  },
  methods: {
    showInfo: function (data) {
      this.form.phone = data.phone;
      this.form.address = data.address;
    },
    calculateTotal: function () {
      let track_rent = this.form.track_rent === "" ? 0 : this.form.track_rent;
      let quantity = this.form.quantity === "" ? 0 : this.form.quantity;
      let others = this.form.others === "" ? 0 : this.form.others;
      let paid = this.form.paid === "" ? 0 : this.form.paid;

      let total =
        (parseFloat(track_rent) + parseFloat(this.load.amount)) *
          parseFloat(quantity) +
        parseFloat(others);
      let due = total - parseFloat(paid);

      this.form.total = parseFloat(total).toFixed(2);
      this.form.due = parseFloat(due).toFixed(2);
    },
    calculateDue: function () {
      let total = this.form.total === "" ? 0 : this.form.total;
      let paid = this.form.paid === "" ? 0 : this.form.paid;
      let due = parseFloat(total) - parseFloat(paid);
      this.form.due = parseFloat(due).toFixed(2);
    },
    store: async function () {
      let self = this;
      const client_id = this.form.client ? this.form.client.id : "";
      const transaction_media_id = this.form.transaction_media
        ? this.form.transaction_media.id
        : "";
      const load_id = this.load ? this.load.id : "";
      const product_id = this.form.product ? this.form.product.id : "";
      const measurement_type_id = this.form.measurement_type
        ? this.form.measurement_type.id
        : "";
      this.$inertia.post(this.route("drivers.invoices.store"), {
        client_id: client_id,
        load_id: load_id,
        transaction_media_id: transaction_media_id,
        company_id: this.company.id,
        driver_name: this.form.driver_name,
        track_no: this.form.track_no,
        driver_phone: this.form.driver_phone,
        product_id: product_id,
        measurement_type_id: measurement_type_id,
        container_height: this.form.container_height,
        container_length: this.form.container_length,
        container_breadth: this.form.container_breadth,
        quantity: this.form.quantity,
        track_rent: this.form.track_rent,
        others: this.form.others,
        total: this.form.total,
        paid: this.form.paid,
        due: this.form.due,
        description: this.form.description,
      });
    },
  },
  created() {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
