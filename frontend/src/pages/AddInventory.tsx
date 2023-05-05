import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {useEffect} from 'react'
import {
  inventoryInitialState,
  inventoryValidationSchema,
} from '../formik-validation/inventories';
import { useAppDispatch, useAppSelector } from '../store/store';
import { changePage, clearSingleinventory, createInventory, getSingleInventory } from '../store/inventoryReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent } from 'react';
import {toast} from 'react-toastify'

const AddInventory = () => {
  const {id}=useParams();
  const { t } = useTranslation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const {numRows,errors:stateErrors,createInventoryPending,singleInventory}=useAppSelector(state=>state.inventory)
  const { values,errors,dirty,handleSubmit,getFieldProps,touched } = useFormik({
    initialValues: singleInventory || inventoryInitialState,
    validationSchema: inventoryValidationSchema,
    onSubmit: () => {
      dispatch( createInventory({input:values,limit:numRows,onSuccess:()=>{
        toast.success(t('table.inventory_added'),{autoClose:2000});
        setTimeout(()=>{
          navigate('/');
        },2000)
      }}));
    },
    enableReinitialize:true
  });
  const submitHandler=(e:FormEvent)=>{
    e.preventDefault();
    handleSubmit();
  }
  useEffect(()=>{
    dispatch(changePage(1))
    dispatch(clearSingleinventory())
  },[dispatch])
  useEffect(()=>{
    if(id) {
      dispatch(getSingleInventory(id));
    }
  },[id,dispatch])
 
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-uppercase mb-2">{id?t('table.update'):t('table.add')}</h1>
      <form className="shadow p-4 w-50 w-sm-75">
        <div className="form-group mb-1">
          <label htmlFor="name_en">{t('table.name_en')}</label>
          <input {...getFieldProps('name_en')} name="name_en" id="name_en" type="text" className={`form-control ${(errors.name_en && touched.name_en) || stateErrors?.name_en?'is-invalid':''}`} />
          {(errors.name_en && touched.name_en) || stateErrors?.name_en && <span className='text-danger'>{errors.name_en||stateErrors?.name_en}</span>}
        </div>
        <div className="form-group mb-1">
          <label htmlFor="name_ka">{t('table.name_ka')}</label>
          <input {...getFieldProps('name_ka')} name="name_ka" id="name_ka" type="text" className={`form-control ${(errors.name_ka && touched.name_ka) || stateErrors?.name_ka?'is-invalid':''}`} />
          {(errors.name_ka && touched.name_ka ) || stateErrors?.name_ka && <span className='text-danger'>{errors.name_ka || stateErrors?.name_ka}</span>}
        </div>
        <div className="form-group mb-1">
          <label htmlFor="price">{t('table.price')}</label>
          <input {...getFieldProps('price')} name="price" type="number" className={`form-control ${(errors.price && touched.price) || stateErrors?.price?'is-invalid':''}`} id="price" />
          {(errors.price  && touched.price) || stateErrors?.price && <span className='text-danger'>{errors.price || stateErrors?.price}</span>}
        </div>
        <div className="form-group">
          <label>{t('table.location')}</label>
          <select  {...getFieldProps('location')} className={`form-control ${(errors.location && touched.location)||stateErrors?.location?'is-invalid':''}`}>
          <option disabled value=''>{t('table.choose_location')}</option>
            <option value="cavea_city_mall">
              {t('location.cavea_city_mall')}
            </option>
            <option value="cavea_east_point">
              {t('location.cavea_east_point')}
            </option>
            <option value="cavea_tbilisi_mall">
              {t('location.cavea_tbilisi_mall')}
            </option>
            <option value="cavea_gallery">{t('location.cavea_gallery')}</option>
            <option value="main_office">{t('location.main_office')}</option>
          </select>
          {(errors.location && touched.location) || stateErrors?.location  && <span className='text-danger'>{errors.location ||stateErrors?.location}</span>}
        </div>
        <button onClick={submitHandler} disabled={!dirty || Object.keys(errors).length>0 || createInventoryPending} type="submit" className="btn btn-primary w-100 mt-2">
          {createInventoryPending?t('Loading...'):id?t('table.update'):t('table.add')}
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
