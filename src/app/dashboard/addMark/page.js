"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Alertwarning } from "@/Utils";
import Table from "@/components/tableData";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
function AddMark() {
    const { data: session } = useSession();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const readExcel = (file) => {
        setLoading(true);
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, {
                    type: "buffer",
                });

                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws, {
                    blankCell: false,
                    defval: null,
                });
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
        promise.then((d) => {
            setItems(d);
            setLoading(false);
        });
    };

    const edata = {
        mamonhoc: "Mã môn học",
        tenmonhoc: "Tên môn học",
        masinhvien: "Mã sinh viên",
        tensinhvien: "Tên sinh viên",
        hocki: "Học kì",
        nam: "Năm học",
        ptramquatrinh: "Phần trăm quá trình",
        ptramgiuaki: "Phần trăm giữa kì",
        ptramcuoiki: "Phần trăm cuối kì",
        diemquatrinh: "Điểm quá trình",
        diemgiuaki: "Điểm giữa kì",
        diemcuoiki: "Điểm cuối kì",
    };
    return (
        <>
            <div className="min-h-full">
                <p className="text-2xl ">Thêm danh sách sinh viên</p>
                <div className=" flex justify-start gap-6">
                    <div className="space-x-4 flex">
                        <label className="px-3 py-2 bg-slate-300 cursor-pointer">
                            Thêm danh sách
                            <input
                                type="file"
                                className={"hidden"}
                                onChange={(e) => {
                                    try {
                                        const file = e.target.files[0];
                                        if (
                                            file.type ==
                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                            file.type == "application/vnd.ms-excel" ||
                                            file.type == ".csv"
                                        )
                                            readExcel(file);
                                        else {
                                            Alertwarning("không đúng định dạng");
                                        }
                                    } catch (error) {}
                                }}
                            />
                        </label>
                        {loading && <Spinner size="sm" />}
                    </div>

                    <Link
                        className="px-3 py-2 bg-slate-300 cursor-pointer"
                        download
                        target="_blank"
                        href="/assets/excel/file-mau.xlsx"
                    >
                        <i className="nav-icon fa fa-download"></i> Tải file mẫu
                    </Link>
                </div>
                {items.length > 0 && (
                    <Table
                        key={Math.random()}
                        // titledata={Object.keys(items[0]).reduce((a, v) => ({ ...a, [v.trim()]: v.trim() }), {})}
                        titledata={edata}
                        data={items}
                        step={5}
                        hasSave={true}
                        setClear={() => setItems([])}
                    />
                )}
            </div>
        </>
    );
}

export default AddMark;
