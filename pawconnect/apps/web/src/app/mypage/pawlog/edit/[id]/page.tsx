import { GetPawLogDetail } from "@/services/pawlog/get-pawlog-detail.server";
import { PageProps } from "@/types/page.type";
import styles from "@/styles/pawlog/editPawLog.module.css"
import EditPawLogForm from "@/components/pawlog/EditPawLogForm";
import NotFound from "@/components/common/NotFound";

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const { pawLog } = await GetPawLogDetail(id);

    if (!pawLog) {
        return <NotFound/>
    }

    return (
        <div className={styles.wrapper_edit}>
            <EditPawLogForm pawLog={pawLog}/>
        </div>
    );
}