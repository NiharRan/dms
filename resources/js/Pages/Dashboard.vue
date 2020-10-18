<template>
  <layout name="Dashboard">
    <section id="dashboard-analytics">
      <div class="row">
        <div class="col-lg-8 col-sm-12">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12">
              <div class="card">
                <div class="card-header d-flex flex-row align-items-start pb-0">
                  <div class="avatar bg-rgba-primary p-50 m-0">
                    <div class="avatar-content">
                      <i class="feather icon-users text-primary font-medium-5"></i>
                    </div>
                  </div>
                  <div>
                    <h2 class="text-bold-700 mt-1 mb-25">{{ total_clients }}</h2>
                  </div>
                </div>
                <div class="card-body">
                  <a :href="route('clients.index')" class="text-center btn btn-block btn-outline-primary">{{ __('All Clients') }}</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="card">
                <div class="card-header d-flex flex-row align-items-start pb-0">
                  <div class="avatar bg-rgba-info p-50 m-0">
                    <div class="avatar-content">
                      <i class="feather icon-package text-info font-medium-5"></i>
                    </div>
                  </div>
                  <h2 class="text-bold-700 mt-1 mb-25">{{ total_products }}</h2>
                </div>
                <div class="card-body">
                  <a :href="route('products.index')" class="text-center btn btn-block btn-outline-info">{{ __('All Products') }}</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="card">
                <div class="card-header d-flex flex-row align-items-start pb-0">
                  <div class="avatar bg-rgba-warning p-50 m-0">
                    <div class="avatar-content">
                      <i class="feather icon-users text-warning font-medium-5"></i>
                    </div>
                  </div>
                  <h2 class="text-bold-700 mt-1 mb-25">{{ today_driver_invoice }}</h2>
                </div>
                <div class="card-body">
                  <a :href="route('drivers.invoices.index')" class="text-center btn btn-block btn-outline-warning">{{ __('Today\'s Driver Invoices') }}</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="card">
                <div class="card-header d-flex flex-row align-items-start pb-0">
                  <div class="avatar bg-rgba-success p-50 m-0">
                    <div class="avatar-content">
                      <i class="feather icon-package text-success font-medium-5"></i>
                    </div>
                  </div>
                  <h2 class="text-bold-700 mt-1 mb-25">{{ today_sale }}</h2>
                </div>
                <div class="card-body">
                  <a :href="route('sales.index')" class="text-center btn btn-block btn-outline-success">{{ __('Today\'s Sales') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="card bg-analytics text-white">
            <div class="card-content">
              <div class="card-body text-center">
                <img src="/images/elements/decore-left.png" class="img-left" alt="card-img-left">
                <img src="/images/elements/decore-right.png" class="img-right" alt="card-img-right">
                <div class="avatar avatar-xl bg-primary shadow mt-0">
                  <div class="avatar-content">
                    <img :src="$page.auth.avatar_medium" :alt="$page.auth.name">
                  </div>
                </div>
                <div class="text-center">
                  <h1 class="mb-0 text-white">{{ __('Congratulations') }}</h1>
                  <h2 class="mb-0 text-white text-italic">{{ $page.auth.name }}</h2>
                  <h3 class="mb-0 btn btn-outline-light text-white">{{ clock }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        
      </div>

      <div class="row" v-if="sales.data.length > 0">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">{{ __('Recent Sales') }}</h4>
            </div>
            <div class="card-content">
              <div class="table-responsive mt-1">
                <table class="table table-hover-animation mb-0">
                  <thead>
                  <tr>
                    <th class="text-uppercase">{{ __('Invoice') }}</th>
                    <th class="text-uppercase">{{ __('Client') }}</th>
                    <th class="text-right text-uppercase">{{ __('Total Price') }}</th>
                    <th class="text-right text-uppercase">{{ __('Paid') }}</th>
                    <th class="text-right text-uppercase">{{ __('Due') }}</th>
                    <th class="text-center text-uppercase">{{ __('Sale At') }}</th>
                    <th class="text-left text-uppercase">{{ __('Status') }}</th>
                    <th class="text-center text-uppercase">{{ __('Action') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="sale in sales.data" :key="sale.id">
                    <th>#{{ sale.invoice }}</th>
                    <th>{{ sale.client.name }}</th>
                    <td class="text-right">{{ sale.total_price }}</td>
                    <td class="text-right">{{ sale.total_paid }}</td>
                    <td class="text-right">{{ sale.total_due }}</td>
                    <td class="text-center">{{ sale.sale_date | moment('DD/MM/YYYY hh:mm A') }}</td>
                    <td class="text-left" v-html="$options.filters.payment_status(sale.status)"></td>
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

      <div class="row" v-if="driver_invoices.data.length > 0">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">{{ __('Recent Driver Invoices') }}</h4>
            </div>
            <div class="card-content">
              <div class="table-responsive mt-1">
                <table class="table table-hover-animation mb-0">
                  <thead>
                  <tr>
                    <th class="text-uppercase">{{ __('Invoice') }}</th>
                    <th class="text-uppercase">{{ __('Client') }}</th>
                    <th class="text-uppercase">{{ __('Driver') }}</th>
                    <th class="text-uppercase">{{ __('Product') }}</th>
                    <th class="text-right text-uppercase">{{ __('Total') }}</th>
                    <th class="text-center text-uppercase">{{ __('Created At') }}</th>
                    <th class="text-left text-uppercase">{{ __('Status') }}</th>
                    <th class="text-center text-uppercase">{{ __('Action') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="driver_invoice in driver_invoices.data" :key="driver_invoice.id">
                    <th>#{{ driver_invoice.invoice }}</th>
                    <th>{{ driver_invoice.client.name }}</th>
                    <th>{{ driver_invoice.driver_name }}</th>
                    <td>{{ driver_invoice.product.name }}</td>
                    <td class="text-right">{{ driver_invoice.total }}</td>
                    <td class="text-center">{{ driver_invoice.created_at | moment('DD/MM/YYYY hh:mm A') }}</td>
                    <td class="text-left" v-html="$options.filters.payment_status(driver_invoice.status)"></td>
                    <td class="text-center">
                      <a :href="route('drivers.invoices.edit', driver_invoice.id)" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                      <a :href="route('drivers.invoices.show', driver_invoice.invoice)" class="text-primary" role="button"><i class="feather icon-eye"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout>
</template>

<script>
    import Layout from "../Shared/Layout";
    export default {
        name: "Dashboard",
        components: {Layout},
        props: [
          'msg',
          'today_driver_invoice',
          'total_clients',
          'total_products',
          'today_sale',
          'sales',
          'stockCharts',
          'driver_invoices',
          'products'
        ],
        data: function () {
            return {
              clock: '',
            }
        },
        methods: {
          showClock: function () {
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();

            m = this.checkTime(m);
            s = this.checkTime(s);
            this.clock = `${h}:${m}:${s}`;
            let t = window.setTimeout(this.showClock, 1000);
          },
          checkTime: function (i) {
            if(i < 10) return `0${i}`;
            return  i;
          }
        },
        created() {
          this.showClock();
        }
    }
</script>

<style>
  .avatar.avatar-xl .avatar-content {
    height: 130px;
    width: 130px;
  }
  .avatar.avatar-xl img {
    width: 115px;
    height: 115px;
  }
</style>
