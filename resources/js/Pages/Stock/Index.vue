<template>
  <layout name="Stock">
    <!-- Stock list start -->
    <section class="users-list-wrapper">
      <!-- Stock section start -->
      <div id="basic-examples">
        <div class="card" v-if="success">
          <div class="card-content">
            <div class="card-body">
              <div class="alert alert-success">
                {{ success }}
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="stocks.data.length > 0">
          <div class="col-md-6 col-12" v-for="stock in stocks.data" :key="stock.id">
            <div class="card">
              <div class="card-content">
                <div class="card-header">
                  <h2 class="mb-0">{{ stock.name }} 
                  </h2>
                  <p class="mb-0">{{ stock.address }}
                    <a @click.prevent="setData(stock)" class="text-info float-right" role="button"><i class="feather icon-edit"></i></a>
                  </p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                      <thead>
                      <tr>
                        <th scope="col">{{__("S.N.")}}</th>
                        <th>{{__("Product")}}</th>
                        <th class="text-center">{{__("Quantity")}}</th>
                        <th class="text-right">{{__("Action")}}</th>
                      </tr>
                      </thead>
                      <tbody v-if="stock.stock_details.length > 0">
                        <tr v-for="(stock_detail, i) in stock.stock_details" :key="stock_detail.id">
                          <th>{{ i + 1 }}</th>
                          <th>{{ stock_detail.product.name }}</th>
                          <th class="text-center">{{ parseFloat(stock_detail.quantity).toFixed(2) }}</th>
                          <th>
                            <inertia-link :title="__('History')" :href="route('stock-details.history.show', stock_detail.id)" class="text-info" role="button"><i class="feather icon-eye"></i></inertia-link>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12"></div>
        </div>
      </div>
      <model>
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
          <button type="button" @click="cleanForm" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </template>

        <form @submit.prevent="storeOrUpdate">
          <div class="modal-body">
              <div class="form-group">
                <input type="text"
                       :placeholder="__('Stock Name')"
                       class="form-control"
                        :class="[errors.name ? 'is-invalid' : '']"
                        v-model="form.name">
                <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.name[0] }}</strong>
                </span>
              </div>

              <div class="form-group">
                <textarea 
                        :placeholder="__('Stock Address')"
                        class="form-control"
                        :class="[errors.address ? 'is-invalid' : '']"
                        v-model="form.address"
                        rows="2"></textarea>
                <span v-if="errors.address" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.address[0] }}</strong>
                </span>
              </div>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? 'Active' : 'Inactive'}}
              </label>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? __('Update') : __('Create') }}</button>
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{__("Cancel")}}</button>
          </div>
        </form>
      </model>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- Stock list ends -->
  </layout>
</template>

<script>
    import Layout from "../../Shared/Layout";
    import Model from "../../Components/Model";
    export default {
        name: "Stock",
        components: {Model, Layout},
        props: {
          success: String,
          stocks: Object,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: this.__('Create New Stock'),
            form: {
              id: '',
              name: '',
              address: '',
              status: '',
            }
          }
        },
        methods: {
          setData: function (data) {
            this.modelTitle = `Edit ${data.name}'s Information`;
            this.editMode = true;
            this.form.name = data.name;
            this.form.address = data.address;
            this.form.status = data.status;
            this.form.id = data.id;
            $("#default").modal('show');
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = this.__('Create New Stock');
            this.editMode = false;
            this.form.name = '';
            this.form.address = '';
            this.form.id = '';
            this.form.status = '';
            Object.keys(this.errors).forEach((key, value) => {
              this.errors[key] = '';
            });
          },
          storeOrUpdate: function () {
            if (this.editMode) {
              this.update();
            }else {
              this.store();
            }
          },
          store: function () {
            let self = this;
            this.$inertia.post(this.route('stocks.store'), {
              name: this.form.name,
              address: this.form.address,
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Stock Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            this.$inertia.post(this.route('stocks.update', this.form.id), {
              name: this.form.name,
              address: this.form.address,
              status: this.form.status,
              _method: "put"
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Stock Updated Successfully');
              }
            });
          },
        }
    }
</script>

<style>

</style>
