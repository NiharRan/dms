<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
          'name'          => 'required',
          'phone'           => 'required|unique:users',
          'gender_id'       => 'required',
          'birth_date'      => 'required',
          'religion_id'     => 'required',
        ];
    }

  /**
   * Get the error messages for the defined validation rules.
   *
   * @return array
   */
  public function messages()
  {
    return [
      'name.required' => __("User name is required"),
      'phone.required' => __("Contact no. is required"),
      'gender_id.required' => __("Gender is required"),
      'birth_date.required' => __("Birth date is required"),
      'religion_id.required' => __("Religion is required"),

      'phone.unique' => __("This contact no. is already used"),
    ];
  }
}
