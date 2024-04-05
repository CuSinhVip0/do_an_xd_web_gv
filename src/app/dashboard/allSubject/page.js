"use client";

import { HOST } from "@/Data";
import Table from "@/components/tableData";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Alerterror } from "@/Utils";
import { Spinner } from "@nextui-org/react";

function AllSubject() {
    const [data, setData] = useState([]);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        try {
            const responce = async () => {
                const res = await fetch(`${HOST}/api/subject/get-by-lecturer`, {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${session.user.name}`,
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        localStorage.setItem("subject", JSON.stringify(res.data));
                        setData(res.data);
                    });
                setLoading(false);
            };
            responce();
        } catch (error) {
            Alerterror("Xảy ra lỗi, liên hệ Nguyễn Khắc thể để fix bug !!!");
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-full">
            <p className="text-2xl  flex items-center gap-5">
                Danh sách các môn phụ trách {loading && <Spinner color="primary" size="md" />}
            </p>
            {data.length > 0 && (
                <Table
                    titledata={{
                        mamonhoc: "Mã môn học",
                        tenmonhoc: "Tên môn học",
                        nam: "Năm học",
                        hocki: "Học ki",
                    }}
                    data={data}
                    step={5}
                />
            )}
        </div>
    );
}

export default AllSubject;
