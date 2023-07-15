import {format} from 'date-fns'

import prismadb from "@/lib/prismadb";
import ColorsClient from "./components/client";
import { ColorColumn } from "./components/columns";

const ColorsPage = async ({
  params
}:{
  params:{storeId:string}
}) => {

  const colors = await prismadb.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedSizes: ColorColumn[] = colors.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    createdAt: format(item.createdAt,'MMM do, yyy')
  }))

  return ( 
    <div className="flex-cols">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <ColorsClient data={formattedSizes} />
      </div>
    </div>
   );
} 
 
export default ColorsPage;