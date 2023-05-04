import { useTranslation } from "react-i18next";

const InventoryTable = () => {
  const {t}=useTranslation();
  return (
    <div>
      <h1 className="mb-4 text-uppercase">Inventory Management</h1>
      <table className="table border">
  <thead>
    <tr>
      <th scope="col" className="text-center">{t('table.name')}</th>
      <th scope="col" className="text-center">{t('table.location')}</th>
      <th scope="col" className="text-center">{t('table.price')}</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
    </div>
  )
}

export default InventoryTable;