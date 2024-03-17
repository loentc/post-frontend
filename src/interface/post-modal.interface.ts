export interface PropModal {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    data: PostDataType;
}