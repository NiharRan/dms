<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            'name' => 'মেসার্স হক ব্রাদার্স',
            'slug' => make_slug('মেসার্স হক ব্রাদার্স'),
            'description' => 'কয়লা, পাথর আমদানীকারক ও সরবরাহকারী',
            'owner' => 'হাজী মোঃ আমিনুল হক',
            'head_office' => '২০৪, পৌরবিপনী (২য় তলা), সুনামগঞ্জ',
            'dipu_office' => 'বড়ছড়া, চারাগাও, বাগলি, সুতারকান্দি ও বুড়িমারি এল/সি ষ্টেশন',
            'address' => 'ধুতমা, তাহিরপুর, সুনামগঞ্জ',
            'sales_center' => 'নতুন ফেরীঘাট, দাউদকান্দি, কুমিল্লা',
            'email' => 'niharranjandasmu@gmail.com',
            'logo' => 'default.jpeg',
            'status' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        $phones = ['01716596008', '01976596008'];
        foreach ($phones as $phone) {
            DB::table('company_phones')->insert([
                'company_id' => 1,
                'phone' => $phone,
                'status' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
