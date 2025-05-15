import { Handle, Position } from "reactflow";
import "./customnode.css"; // Đảm bảo bạn có file này
import { NodeProps } from "reactflow";
type MyNodeData = {
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
};
const CustomNode = ({ data }: NodeProps<MyNodeData>) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">{data.label}</div>

      <div className="custom-node-footer">
        <button onClick={data.onEdit}>✏️</button>
        <button onClick={data.onDelete}>🗑️</button>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
