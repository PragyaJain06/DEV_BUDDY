export default function Toast({ msg, status }) {
  return (
    <div className="toast toast-top toast-end z-100">
      <div
        className={
          status === "err"
            ? "alert alert-error"
            : status === "warn"
            ? "alert alert-warning"
            : "alert alert-success"
        }
      >
        <span>{msg}</span>
      </div>
    </div>
  );
}
