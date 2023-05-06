import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  changeFilter,
  changeNumRows,
  changePage,
  changeSort,
  clearErrors,
  deleteInventory,
  getAllInventories,
} from '../store/inventoryReducer';
import useLocales from '../hooks/useLocales';
import { LocationFilter, Names, SortDirection, SortOptions } from '../types/inventories';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const InventoryTable = () => {
  const { currentLanguageCode } = useLocales();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    data,
    getAllInventoriesPending,
    numOfPages,
    nextPage,
    prevPage,
    currentPage,
    total,
    numRows,
    filter,
    sort,
    sortDir
  } = useAppSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(changeSort({sort:`name_${currentLanguageCode}` as SortOptions,sortDir:'ASC'}))
  }, [dispatch,currentLanguageCode]);
  useEffect(() => {
    if (currentPage) {
      dispatch(getAllInventories({ page: currentPage, limit: numRows,filter,sort,sortDir }));
    }
  }, [dispatch, currentPage, numRows,filter,sort,sortDir]);
  const handleSort=(e:ChangeEvent<HTMLSelectElement>)=>{
        const [sort,sortDir]=e.target.value.split('-') as [SortOptions,SortDirection];
        dispatch(changeSort({sort,sortDir}));
  }
  return (
    <div className="d-flex flex-column">
      <h1 className="mb-4 text-uppercase">Inventory Management</h1>
      <div className='d-flex justify-content-between mb-2 gap-2'>
    <div className='d-flex gap-3 align-items:center'>
    <div className="form-group">
    <label className='h5'><i className="bi bi-geo-alt-fill"></i>{t('table.location')}</label>
    <select onChange={e=>dispatch(changeFilter(e.target.value as LocationFilter | ''))} className="form-select">
    <option  value="">
              {t('location.all')}
            </option>
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
  </div>
    <div className="form-group">
    <label className='h5'><i className="bi bi-sort-up"></i>{t('table.sort_by')}</label>
    <select onChange={handleSort} className="form-select">
    <option  value={`name_${currentLanguageCode}-ASC`}>
              {t('table.name_asc')}
            </option>
            <option value={`name_${currentLanguageCode}-DESC`}>
              {t('table.name_desc')}
            </option>
            <option value="price-ASC">
              {t('table.price_asc')}
            </option>
            <option value="price-DESC">
              {t('table.price_desc')}
            </option>
    </select>
  </div>
    </div>
      <button className="mb-2 d-flex gap-2 p-2 align-self-end  border-0 ml-auto">
        <Link to="/add">
          <i className="bi bi-plus-circle-fill mr-1"></i>
          {` `}
          {t('table.add')}
        </Link>
      </button>
      </div>
      <div className="table-wrapper mb-2">
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">{t('table.name')}</th>
              <th scope="col">{t('table.location')}</th>
              <th scope="col">{t('table.price')}</th>
              <th scope="col">{t('table.created_at')}</th>
              <th scope="col">{t('table.updated_at')}</th>
              <th scope="col">{t('table.operations')}</th>
            </tr>
          </thead>
          <tbody>
            {getAllInventoriesPending ? (
              <Loading />
            ) : data ? (
              data.map((item) => (
                <tr key={item.uuid}>
                  <th scope="row">
                    {item[`name_${currentLanguageCode}` as keyof Names]}
                  </th>
                  <td>{t(`location.${item.location}`)}</td>
                  <td>{item.price}</td>
                  <td>{moment(item.createdAt).format('L')}</td>
                  <td>{moment(item.updatedAt).format('L')}</td>
                  <td className='d-flex gap-2 justify-content-center'>
                    <Link to={`/update/${item.uuid}`}>
                    <button className="border border-success text-success bg-white  p-2 rounded-sm">
                    <i className="bi bi-pencil-square text-success"></i>
                      {` `}
                      {t('table.update_short')}
                    </button></Link>
                    
                    <button onClick={()=>dispatch(deleteInventory({id:item.uuid,currentPage,limit:numRows,onSuccess:()=>{
                      dispatch(getAllInventories({filter,sort,sortDir,limit:numRows,page:currentPage}))
                    }}))} className="border border-danger text-danger bg-white  p-2 rounded-sm">
                      <i className="bi bi-x-circle-fill text-danger"></i>
                      {` `}
                      {t('table.remove')}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              ''
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center flex-column flex-md-row flex-lg-row flex-xl-row gap-4 align-items-center">
        <ul className="pagination mb-0">
          <button
            onClick={() => dispatch(changePage(currentPage - 1))}
            disabled={!prevPage}
            className="page-item border-0 p-2"
          >
            {t('table.prev')}
          </button>
          {Array.from({ length: numOfPages }, (_, i) => i + 1).map((item) => (
            <li
              onClick={() => dispatch(changePage(item))}
              className={`page-item ${
                currentPage === item ? 'text-bold bg-primary' : ''
              }`}
            >
              <a className="page-link" href="#">
                {item}
              </a>
            </li>
          ))}

          <button
            onClick={() => dispatch(changePage(currentPage + 1))}
            disabled={!nextPage}
            className="page-item border-0 p-2"
          >
            {t('table.next')}
          </button>
        </ul>
        <select
          onChange={(e) => dispatch(changeNumRows(+e.target.value))}
          value={numRows}
          className="p-2"
        >
          <option className="p-2" value={10}>
            10 {t('table.record')}
          </option>
          <option className="p-2" value={20}>
            20 {t('table.record')}
          </option>
          <option className="p-2" value={50}>
            50 {t('table.record')}
          </option>
        </select>
        <p className="h5">
          {' '}
          {t('table.total_inventory_amount')} : {total}
        </p>
      </div>
    </div>
  );
};

export default InventoryTable;
