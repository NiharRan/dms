<template>
  <layout name="Stock">
    <!-- Stock list start -->
    <section class="users-list-wrapper">
      <!-- Stock section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive" v-if="stocks.data.length > 0">
                <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                  <thead>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th class="text-center">Stock</th>
                    <th>Created At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(stock, index) in stocks.data" :key="stock.id">
                      <th>{{ index + 1 }}</th>
                      <th>{{ stock.name }}</th>
                      <th>{{ stock.address }}</th>
                      <th class="text-center">{{ stock.stock }}</th>
                      <td>{{ stock.default_date_time }}</td>
                      <td v-html="$options.filters.status(stock.status)"></td>
                      <td class="text-center">
                        <a @click.prevent="setData(stock)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
                       placeholder="Stock Name"
                       class="form-control"
                        :class="[errors.name ? 'is-invalid' : '']"
                        v-model="form.name">
                <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.name[0] }}</strong>
                </span>
              </div>

              <div class="form-group">
                <textarea 
                        placeholder="Stock Address"
                        class="form-control"
                        :class="[errors.address ? 'is-invalid' : '']"
                        v-model="form.address"
                        rows="2"></textarea>
                <span v-if="errors.address" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.address[0] }}</strong>
                </span>
              </div>

              <div class="form-group">
                <textarea 
                        placeholder="Stock Quantity"
                        class="form-control"
                        :class="[errors.quantity ? 'is-invalid' : '']"
                        v-model="form.quantity"
                        rows="2"></textarea>
                <span v-if="errors.quantity" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.quantity[0] }}</strong>
                </span>
              </div>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? 'Active' : 'Inactive'}}
              </label>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? 'Update' : 'Create' }}</button>
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">Cancel</button>
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
            modelTitle: 'Create New Stock',
            form: {
              id: '',
              name: '',
              address: '',
              quantity: '',
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
            this.form.quantity = data.quantity;
            this.form.status = data.status;
            this.form.id = data.id;
            $("#default").modal('show');
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = 'Create New Stock';
            this.editMode = false;
            this.form.name = '';
            this.form.address = '';
            this.form.quantity = '';
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
              quantity: this.form.quantity,
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
              quantity: this.form.quantity,
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
