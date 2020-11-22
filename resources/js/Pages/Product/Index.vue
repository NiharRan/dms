<template>
  <layout name="Product">
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

              <div class="table-responsive">
                <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
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
                    <th colspan="3"></th>
                    <th colspan="2">
                      <input type="text" @keyup="searchData" v-model="search.query" class="form-control" placeholder="Search">
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody v-if="products.data.length > 0">
                  <tr v-for="(product, index) in products.data" :key="product.id">
                    <th style="width: 50px">{{ index + 1 }}</th>
                    <th style="width: 150px;">
                      <img style="width: 100%" :src="product.image_small" :alt="product.name">
                    </th>
                    <th>{{ product.name }}</th>
                    <th>{{ product.product_type.name }}</th>
                    <td>{{ product.default_date_time }}</td>
                    <td v-html="$options.filters.status(product.status)"></td>
                    <td class="text-center">
                      <a @click.prevent="editData(product)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <model :size="'modal-lg'">
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
          <button type="button" @click="cleanForm" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </template>

        <form @submit.prevent="storeOrUpdate">
          <div class="modal-body">
              <div class="row">
                <div class="col-md-8 col-12">
                  <div class="form-group">
                    <label>{{ __("Product Name") }}</label>
                    <input type="text"
                           :placeholder="__('Product Name')"
                           class="form-control"
                           :class="[errors.name ? 'is-invalid' : '']"
                           v-model="form.name">
                    <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.name[0] }}</strong>
                    </span>
                  </div>
                  <div class="form-group">
                    <label>{{ __('Product Type') }}</label>
                    <multi-select
                      v-model="form.product_type"
                      :options="product_types"
                      label="name"
                      track-by="name"
                      :searchable="true"
                      :close-on-select="true"
                      :placeholder="__('Product Type')">
                    </multi-select>
                    <span v-if="errors.product_type_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.product_type_id[0] }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="form-group">
                    <div class="banner-logo-upload-box mx-auto" style="background: #f3f3f3;width: 170px;height: 140px;">
                      <img :src="form.image_url" class="users-avatar-shadow rounded" alt="">
                      <label class="btn-pill" style="font-size: 35px;">
                        <i class="fa fa-camera"></i>
                        <input @change="showImage" type="file" name="image" accept="image/*" class="hidden"/>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? __('Active') : __('Inactive')}}
              </label>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? __('Update') : __('Create') }}</button>
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{ __('Cancel') }}</button>
          </div>
        </form>
      </model>
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
        name: "Product",
        components: {DataTable, Model, Layout},
        props: {
          success: String,
          products: Object,
          product_types: Array,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: 'Create New Product',
            form: {
              id: '',
              name: '',
              status: '',
              image: null,
              product_type: null,
              image_url: ''
            },
            search: {
              per_page: 10,
              query: ''
            }
          }
        },
        methods: {
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = 'Create New Product';
            this.editMode = false;
            this.form.name = '';
            this.form.id = '';
            this.form.status = '';
            this.form.image_url = '';
            this.form.product_type = null;
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
            const product_type_id = this.form.product_type ? this.form.product_type.id : '';
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('product_type_id', product_type_id);
            formData.append('image', this.form.image);
            this.$inertia.post(this.route('products.store'), formData)
              .then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Product Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            const product_type_id = this.form.product_type ? this.form.product_type.id : '';
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('product_type_id', product_type_id);
            formData.append('image', this.form.image);
            formData.append('status', this.form.status);
            formData.append('_method', 'put');
            this.$inertia.post(this.route('products.update', this.form.id), formData)
              .then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Product Updated Successfully');
              }
            });
          },
          showImage: function (e) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            this.form.image_url = url;
            this.form.image = file;
          },
          searchData: function () {
            this.$inertia.replace(this.route('products.index'), {
              method: 'get',
              data: {
                search: this.search.query,
                per_page: this.search.per_page,
              },
              preserveState: true,
              preserveScroll: true,
            });
          },
          editData: function (data) {
            this.modelTitle = `Edit ${data.name}'s Information`;
            this.editMode = true;
            this.form.name = data.name;
            this.form.product_type = data.product_type;
            this.form.status = data.status;
            this.form.id = data.id;
            this.form.image_url = data.image_original;
            $("#default").modal('show');
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
