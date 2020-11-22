<template>
  <div
    class="main-menu menu-accordion menu-shadow"
    data-scroll-to-active="true"
    :class="$page.configData.menuType + ' ' + [($page.configData.theme === 'light') ? 'menu-light' : 'menu-dark' ]">
  <div class="navbar-header">
    <ul class="nav navbar-nav flex-row">
      <li class="nav-item mr-auto">
        <inertia-link class="navbar-brand" href="/">
          <div class="brand-logo"></div>
          <h2 class="brand-text mb-0">Vuexy</h2>
        </inertia-link>
        </li>
      <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block primary collapse-toggle-icon" data-ticon="icon-disc"></i></a></li>
    </ul>
  </div>
  <div class="shadow-bottom"></div>
  <div class="main-menu-content">
    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
      <li class="nav-item">
        <inertia-link href="/">
          <i class="feather icon-home"></i>
          <span class="menu-title" data-i18n="">{{ __('Dashboard') }}</span>
        </inertia-link>
      </li>



      <li class="nav-item">
        <inertia-link :href="route('users.index')">
          <i class="feather icon-users"></i>
          <span class="menu-title" data-i18n="">{{__('Users')}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('companies.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Company")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('stock-details.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Purchase Product")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item has-sub">
        <a href="">
          <i class="fa fa-money"></i>
          <span class="menu-title" data-i18n="">{{ __('Invoice') }}</span>
        </a>
        <ul>
          <li class="nav-item">
            <inertia-link :href="route('sales.index')">
              <i class="feather icon-unlock"></i>
              <span class="menu-title" data-i18n="">{{__("Sale")}}</span>
            </inertia-link>
          </li>
          <li class="nav-item">
            <inertia-link :href="route('drivers.invoices.index')">
              <i class="feather icon-unlock"></i>
              <span class="menu-title" data-i18n="">{{__("Driver")}}</span>
            </inertia-link>
          </li>
        </ul>
      </li>

      <li class="nav-item has-sub">
        <a href="">
          <i class="fa fa-money"></i>
          <span class="menu-title" data-i18n="">{{ __('Accounts') }}</span>
        </a>
        <ul>
          <li class="nav-item">
            <inertia-link :href="route('sales.index')">
              <i class="feather icon-unlock"></i>
              <span class="menu-title" data-i18n="">{{__("Account Statement")}}</span>
            </inertia-link>
          </li>
          <li class="nav-item">
            <inertia-link :href="route('drivers.invoices.index')">
              <i class="feather icon-unlock"></i>
              <span class="menu-title" data-i18n="">{{__("Driver")}}</span>
            </inertia-link>
          </li>
        </ul>
      </li>

      <li class="navigation-header">
        <span>Settings</span>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('stocks.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Stock")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('clients.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Client")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('measurement-types.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Measurement Type")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('loads.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Load")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('product-types.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Product Type")}}</span>
        </inertia-link>
      </li>
      <li class="nav-item">
        <inertia-link :href="route('products.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Product")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('transaction-types.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Transaction Type")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('transaction-media.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Transaction Media")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('roles.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Role")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('genders.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Gender")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('religions.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Religion")}}</span>
        </inertia-link>
      </li>

      <li class="nav-item">
        <inertia-link :href="route('blood-groups.index')">
          <i class="feather icon-unlock"></i>
          <span class="menu-title" data-i18n="">{{__("Blood Group")}}</span>
        </inertia-link>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style>

</style>
