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
          'avatar'          => 'required|image|mimes:jpeg,png,jpg|max:2048'
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

      'avatar.required' => __("User image is required"),
      'avatar.image' => __("Invalid file"),
      'avatar.mimes' => __("Image must be with in jpeg, png, or jpg format"),
      'avatar.max' => __("Image must be less then 2mb")
    ];
  }
}
