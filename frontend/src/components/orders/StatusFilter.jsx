function StatusFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="All">All Status</option>

      <option value="CREATED">Created</option>
      <option value="CONFIRMED">Confirmed</option>
      <option value="PROCESSING">Processing</option>
      <option value="PACKAGED">Packaged</option>
      <option value="PICKED_UP">Picked Up</option>
      <option value="AT_ORIGIN_HUB">At Origin Hub</option>
      <option value="IN_TRANSIT">In Transit</option>
      <option value="AT_DESTINATION_HUB">
        At Destination Hub
      </option>
      <option value="OUT_FOR_DELIVERY">
        Out For Delivery
      </option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
      <option value="FAILED">Failed</option>
    </select>
  );
}

export default StatusFilter;