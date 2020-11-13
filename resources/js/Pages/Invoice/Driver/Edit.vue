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

              <form @submit.prevent="update">
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label
                      >{{ __("Client")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <multi-select
                      v-model="driver_invoice.client"
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
                      v-model="driver_invoice.client_phone"
                      :placeholder="__('Client Contact No.')"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __("Client Address") }}</label>
                    <input
                      type="text"
                      v-model="driver_invoice.client_address"
                      :placeholder="__('Client Address')"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-3 col-12">
                    <label
                      >{{ __("Driver Name")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="driver_invoice.driver_name"
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

                  <div class="col-md-3 col-12">
                    <label
                      >{{ __("Track Number")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="driver_invoice.track_no"
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
                  <div class="col-md-3 col-12">
                    <label
                      >{{ __("Driver Contact No.")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="driver_invoice.driver_phone"
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
                  <div class="col-md-3 col-12">
                    <label
                      >{{ __("Reference")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <input
                      type="text"
                      v-model="driver_invoice.reference"
                      :class="[errors.reference ? 'in-invalid' : '']"
                      :placeholder="__('Reference')"
                      class="form-control"
                    />

                    <span
                      v-if="errors.reference"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.reference[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <table class="table table-bordered table-responsive-sm">
                    <tr>
                      <th>
                        <multi-select
                          v-model="driver_invoice.product"
                          :options="products"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Product')"
                        ></multi-select>
                      </th>
                      <th>
                        <multi-select
                          v-model="driver_invoice.measurement_type"
                          :options="measurement_types"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Measurement Type')"
                        ></multi-select>
                      </th>
                      <th style="width: 25%">
                        <div
                          class="row"
                          v-if="
                            driver_invoice.measurement_type &&
                            driver_invoice.measurement_type.id === 2
                          "
                        >
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="driver_invoice.container_height"
                              :placeholder="__('Height')"
                              class="form-controll"
                            />
                          </div>
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="driver_invoice.container_length"
                              :placeholder="__('Length')"
                              class="form-controll"
                            />
                          </div>
                          <div class="col-md-4 col-4">
                            <input
                              type="text"
                              v-model="driver_invoice.container_breadth"
                              :placeholder="__('Breadth')"
                              class="form-controll"
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <input
                          type="text"
                          v-model="driver_invoice.quantity"
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
                      <th colspan="3" class="text-right">
                        {{ __("Track Rent") }}
                      </th>
                      <th>
                        <input
                          type="text"
                          class="form-control"
                          v-model="driver_invoice.track_rent"
                          @keyup="calculateTotal"
                          :placeholder="__('Track Rent')"
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
                          v-model="driver_invoice.others"
                          @keyup="calculateTotal"
                          :placeholder="__('Others')"
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
                          v-model="driver_invoice.total"
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
                          v-model="driver_invoice.paid"
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
                          v-model="driver_invoice.due"
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
                          v-model="driver_invoice.transaction_media"
                          :options="transaction_medias"
                          :class="[errors.driver_name ? 'in-invalid' : '']"
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
                          v-model="driver_invoice.description"
                          class="form-control"
                          :placeholder="__('Description')"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colspan="6" class="text-right">
                        <inertia-link
                          :href="
                            route(
                              'drivers.invoices.show',
                              driver_invoice.invoice
                            )
                          "
                          class="btn btn-primary"
                        >
                          <i class="feather icon-arrow-left"></i>
                          {{ __("Back") }}
                        </inertia-link>
                        <button type="submit" class="btn btn-success">
                          <i class="feather icon-printer"></i>
                          {{ __("Update") }}
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
    driver_invoice: Object,
    clients: Array,
    products: Array,
    load: Object,
    transaction_medias: Array,
    measurement_types: Array,
    errors: Object,
  },
  data: function () {
    return {};
  },
  methods: {
    showInfo: function (data) {
      this.driver_invoice.client_phone = data.phone;
      this.driver_invoice.client_address = data.address;
    },
    calculateTotal: function () {
      let track_rent =
        this.driver_invoice.track_rent === "" ||
        this.driver_invoice.track_rent === null
          ? 0
          : this.driver_invoice.track_rent;
      let quantity =
        this.driver_invoice.quantity === "" ||
        this.driver_invoice.quantity === null
          ? 0
          : this.driver_invoice.quantity;
      let others =
        this.driver_invoice.others === "" || this.driver_invoice.others === null
          ? 0
          : this.driver_invoice.others;
      let paid =
        this.driver_invoice.paid === "" || this.driver_invoice.paid === null
          ? 0
          : this.driver_invoice.paid;

      let total =
        (parseFloat(track_rent) + parseFloat(this.load.amount)) *
          parseFloat(quantity) +
        parseFloat(others);
      let due = total - parseFloat(paid);
      this.driver_invoice.total = parseFloat(total).toFixed(2);
      this.driver_invoice.due = parseFloat(due).toFixed(2);
      this.calculateCommission();
    },
    calculateCommission: function () {
      let quantity =
        this.driver_invoice.quantity === "" ? 0 : this.driver_invoice.quantity;

      let commission =
        parseFloat(this.load.stock_rent) +
        parseFloat(this.load.amount) * parseFloat(quantity);
      this.driver_invoice.commission = parseFloat(commission).toFixed(2);
      console.log(this.driver_invoice.commission);
    },
    calculateDue: function () {
      let total = this.driver_invoice.total;
      let paid = this.driver_invoice.paid;
      let due = parseFloat(total) - parseFloat(paid);
      this.driver_invoice.due = parseFloat(due).toFixed(2);
    },
    update: async function () {
      let self = this;
      const client_id = this.driver_invoice.client
        ? this.driver_invoice.client.id
        : "";
      const transaction_media_id = this.driver_invoice.transaction_media
        ? this.driver_invoice.transaction_media.id
        : "";
      const load_id = this.load ? this.load.id : "";
      const product_id = this.driver_invoice.product
        ? this.driver_invoice.product.id
        : "";
      const measurement_type_id = this.driver_invoice.measurement_type
        ? this.driver_invoice.measurement_type.id
        : "";
      this.$inertia.put(
        this.route("drivers.invoices.update", this.driver_invoice.id),
        {
          client_id: client_id,
          client_address: this.driver_invoice.client_address,
          client_phone: this.driver_invoice.client_phone,
          transaction_media_id: transaction_media_id,
          load_id: load_id,
          company_id: this.driver_invoice.company.id,
          driver_name: this.driver_invoice.driver_name,
          track_no: this.driver_invoice.track_no,
          driver_phone: this.driver_invoice.driver_phone,
          product_id: product_id,
          measurement_type_id: measurement_type_id,
          container_height: this.driver_invoice.container_height,
          container_length: this.driver_invoice.container_length,
          container_breadth: this.driver_invoice.container_breadth,
          quantity: this.driver_invoice.quantity,
          scale: this.driver_invoice.scale,
          track_rent: this.driver_invoice.track_rent,
          others: this.driver_invoice.others,
          total: this.driver_invoice.total,
          paid: this.driver_invoice.paid,
          due: this.driver_invoice.due,
          description: this.driver_invoice.description,
          commission: this.driver_invoice.commission,
          reference: this.driver_invoice.reference,
        }
      );
    },
  },
  created() {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
