import React,{useCallback, useEffect, useMemo, useState} from "react";
import { useGlobalFilter, useSortBy,usePagination, useTable, Row, useRowSelect, TableOptions, TableState } from "react-table";
import { Search } from "../search/search";
import { COLUMNS } from "../column/columns";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { PageSelect } from "../combobox/PageSelect";
import './table.scss'
import { TablePageMoveButton } from "../buttons/tablePageMoveButton/tablePageMoveButton";
import { StopCheckbox } from "../checkbox/stopCheckbox";
import { Theader } from "./theader";
import { CellSelectHooks } from "../hooks/selectCheckboxHooks";
import { Tbody } from "./tbody";
import { Modal } from "../modal/modal";

type Props = {
    stopCheck:boolean
    stopHandleCheckbox:(event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Table = ({stopCheck,stopHandleCheckbox}:Props) =>{
    const columns = useMemo(() => COLUMNS,[])
    const data = useSelector<RootState,any>(state => state.historylast)    
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [values,setValues] = useState(Object)
            
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,        
        setGlobalFilter,   
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        selectedFlatRows,
                
    } = useTable({columns
        , data,
        autoResetSelectedRows: false,
    }, useGlobalFilter,useSortBy,usePagination,useRowSelect,CellSelectHooks,
    ); 
          
    const { pageSize,selectedRowIds } = state 
    
    const onClickToggleModal = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,cell:any)=>{
        const {eq} = cell.row.values                
        if(cell?.column?.id != 'selection'){
            if(!cell?.row?.isSelected)  {    
                setValues(cell?.row?.values)
                setOpenModal(!isOpenModal);
            }
        }
    } 


    return (
        <>
            <div className="table-pagesize">
                <div className="clsStopCheckbox">
                    <StopCheckbox check={stopCheck} HandleCheckbox={stopHandleCheckbox}/>
                    <button  
                    className="selectButton"
                    onClick={()=>{const test = selectedFlatRows.map(
                        (d) => d.original
                        )
                        console.log(selectedFlatRows)                    
                    }}>
                        옵션
                    </button>
                    <Search onSubmit={setGlobalFilter}/>                       
                </div>
                <div className="clsTableControll">
                    <PageSelect pageSize={pageSize} setPageSize={(e) => setPageSize(e)}/>
                </div>
            </div>
            
            <div className="table">                       
                <table {...getTableProps()}>

                    <Theader headerGroups={headerGroups}/>
                    {isOpenModal && (
                        <Modal 
                        open={isOpenModal}
                        values={values}
                            setModalOpen={setOpenModal}>
                            이곳에 children이 들어갑니다.
                        </Modal>
                        )            
                    }
                    <Tbody 
                    BodyProps={getTableBodyProps}
                    page={page}
                    prepareRow={prepareRow}
                    cellClick={onClickToggleModal}
                    />
                     
                </table>

                <TablePageMoveButton 
                gotoPage={gotoPage} 
                previousPage={previousPage} 
                nextPage={nextPage}
                state={state}
                pageOptions={pageOptions}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                />                   
            
            </div>
            
            
        </> 
    );
}

export default Table;

