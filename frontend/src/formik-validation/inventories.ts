import { object, number, string, ObjectSchema } from 'yup';
import { InventoryForm } from '../types/inventories';

const inventoryInitialState: InventoryForm = {
  name_en: '',
  name_ka: '',
  price: '',
  location: '',
};

const inventoryValidationSchema: ObjectSchema<InventoryForm> = object({
  name_en: string().required('name_required'),
  name_ka: string().required('name_required'),
  price: number().required('price_required').min(1, 'price_minimum_1'),
  location: string()
    .required()
    .oneOf([
      'cavea_tbilisi_mall',
      'cavea_city_mall',
      'cavea_east_point',
      'main_office',
      'cavea_gallery',
    ]),
});

export { inventoryInitialState, inventoryValidationSchema };
