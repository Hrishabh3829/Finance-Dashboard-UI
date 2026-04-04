export function AccessDenied() {
  return (
    <div className="p-10 text-center space-y-3">
      <h2 className="text-2xl font-semibold">Access denied</h2>
      <p className="text-muted-foreground">
        Admin access only. Switch your role to Admin to continue.
      </p>
    </div>
  );
}
