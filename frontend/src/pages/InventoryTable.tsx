import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../store/store';
import { changeNumRows, changePage, getAllInventories } from '../store/inventoryReducer';
import useLocales from '../hooks/useLocales';
import { Names } from '../types/inventories';
import Loading from '../components/Loading';

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
    numRows
  } = useAppSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(getAllInventories({ page: currentPage,limit:numRows }));
  }, [dispatch, currentPage,numRows]);
  return (
    <div>
      <h1 className="mb-4 text-uppercase">Inventory Management</h1>
      <div className="table-wrapper mb-2">
      <table className="table border">
        <thead>
          <tr>
            <th scope="col">{t('table.name')}</th>
            <th scope="col">{t('table.location')}</th>
            <th scope="col">{t('table.price')}</th>
            <th scope="col">{t('table.created_at')}</th>
            <th scope="col">{t('table.updated_at')}</th>
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
              </tr>
            ))
          ) : (
            ''
          )}
        </tbody>
      </table>
      </div>
      
      <div className='d-flex justify-content-center flex-column flex-md-row flex-lg-row flex-xl-row gap-4 align-items-center'>
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
      <select onChange={(e)=>dispatch(changeNumRows(+e.target.value))} value={numRows} className='p-2'>
        <option className='p-2' value={10}>10 {t('table.record')}</option>
        <option className='p-2' value={20}>20 {t('table.record')}</option>
        <option className='p-2' value={50}>50 {t('table.record')}</option>
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
