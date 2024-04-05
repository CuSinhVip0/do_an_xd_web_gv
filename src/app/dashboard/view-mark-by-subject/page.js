"use client";
import { Spinner } from "@nextui-org/react";
import { HOST } from "@/Data";
import Table from "@/components/tableData";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Alerterror, ExportExcel } from "@/Utils";
function ViewMarkBySubject() {
    const { data: session } = useSession();
    const [subjects, setSubjects] = useState([]);
    const [results, setResults] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("subject") != null && localStorage.getItem("subject") != "undefined") {
            setSubjects(JSON.parse(localStorage.getItem("subject")));
            setLoading(false);
        } else {
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
                            setSubjects(res.data);
                        });
                    setLoading(false);
                };
                responce();
            } catch (error) {
                Alerterror("Xảy ra lỗi, liên hệ Nguyễn Khắc thể để fix bug !!!");
                setLoading(false);
            }
        }
    }, []);

    const handleShow = (e) => {
        setName(e.target.value);
        if (e.target.value == "") {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const responce = async () => {
                const res = await fetch(`${HOST}/api/score/get-by-subject/${e.target.value.trim()}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.user.name}`,
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        setResults(res.data);
                        setLoading(false);
                    });
            };
            responce();
        } catch (error) {
            Alerterror("Xảy ra lỗi, liên hệ Nguyễn Khắc thể để fix bug !!!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full">
            <p className="text-2xl ">Xem điểm theo môn</p>
            <div className=" flex items-center  ">
                <select
                    onChange={handleShow}
                    className="text-base font-bold text-[#6e7377] px-4 py-2 outline-none max-w-[30rem] w-full mr-4"
                >
                    <option value="">-- Chọn môn --</option>
                    {subjects.map((item) => {
                        return (
                            <option key={item.mamonhoc} value={item.mamonhoc}>
                                {item.tenmonhoc} - HK {item.hocki} - {item.nam}
                            </option>
                        );
                    })}
                </select>
                {loading && <Spinner size="md" color="success" />}
            </div>

            {results.length > 0 && (
                <Table
                    titledata={{
                        masinhvien: "Mã sinh viên",
                        tensinhvien: "Tên sinh viên",
                        hocki: "Học kì",
                        nam: "Năm học",
                        ptramquatrinh: "% QT",
                        ptramgiuaki: "% GK",
                        ptramcuoiki: "% CK",
                        diemquatrinh: "QT",
                        diemgiuaki: "GK",
                        diemcuoiki: "CK",
                        xacnhan: "XN",
                    }}
                    data={results}
                    step={5}
                    hasEdit={true}
                    hasCheck={true}
                    excel={true}
                    nameExcel={name}
                />
            )}
        </div>
    );
}

export default ViewMarkBySubject;
