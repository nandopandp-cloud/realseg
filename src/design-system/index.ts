/**
 * RealSeg Design System: ponto único de importação.
 *   import { Button, Card, SecurityRadar } from "@/design-system";
 */

// Tokens
export * from "./tokens";

// Marca e ícones
export { Logo, logoMinHeight } from "./brand/Logo";
export { Icon, LprIcon, icons, iconSizes, type IconName, type IconSize } from "./icons";

// Primitives
export { Button, IconButton, type ButtonVariant, type ButtonSize } from "./components/primitives/Button";
export { Text, Heading, Highlight } from "./components/primitives/Text";
export { StatusDot, Kicker, Kbd, Divider, AccentRule, type StatusTone } from "./components/primitives/Indicators";

// Layout
export {
  Container,
  Stack,
  Inline,
  Grid,
  Section,
  Split,
  SidebarLayout,
  DashboardLayout,
} from "./components/layout/Layout";

// Navigation
export { Header, type NavItem } from "./components/navigation/Header";
export { Tabs, Breadcrumb, Pagination, Sidebar, type SidebarGroup } from "./components/navigation/Navigation";

// Forms
export { Field } from "./components/forms/Field";
export { Input, PasswordInput, SearchInput, DateInput, Textarea, Select } from "./components/forms/Inputs";
export { Combobox } from "./components/forms/Combobox";
export { Checkbox, RadioGroup, Switch, Slider } from "./components/forms/Choice";

// Feedback
export { Alert, type AlertTone } from "./components/feedback/Alert";
export { Badge, Tag } from "./components/feedback/Badge";
export { Tooltip } from "./components/feedback/Tooltip";
export { ToastProvider, useToast } from "./components/feedback/Toast";
export { Spinner } from "./components/feedback/Spinner";
export { Skeleton, Progress, Stepper, SecurityLoader } from "./components/feedback/Loaders";
export { EmptyState } from "./components/feedback/EmptyState";

// Overlays
export { Dialog, Modal, Drawer, BottomSheet } from "./components/overlays/Dialog";
export { Menu, type MenuItem } from "./components/overlays/Menu";

// Data display
export {
  Card,
  MediaCard,
  MetricCard,
  TechnologyCard,
  CaseCard,
  Avatar,
  AvatarGroup,
} from "./components/data-display/Cards";
export { DataTable, SecurityEventTable, type Column, type SecurityEvent } from "./components/data-display/DataTable";

// Security
export {
  StatusChip,
  SecurityStatus,
  MonitoringIndicator,
  AlertIndicator,
  AIIndicator,
  CameraStatus,
  EventCard,
  ResponseStatus,
} from "./components/security/Security";

// Visualization
export {
  Sparkline,
  ChartFrame,
  BarChart,
  LineChart,
  Donut,
  Heatmap,
  seriesColors,
} from "./components/visualization/Charts";

// Security visual language
export { SecurityGrid, SecurityScan, Atmosphere, GraphicStage } from "./components/graphics/Surfaces";
export { SecurityRadar, defaultRadarNodes, type RadarNode } from "./components/graphics/SecurityRadar";
export {
  SecurityHUD,
  SecurityTarget,
  SecurityNode,
  SecurityDataPoint,
  SecurityLens,
  ScanFlare,
} from "./components/graphics/Hud";
export { SecurityConnection, SecuritySignal } from "./components/graphics/Lines";
export { SecurityMap, defaultMarkers, type MapMarker } from "./components/graphics/SecurityMap";

// Media & motion
export { CinematicImage } from "./components/media/CinematicImage";
export { Lightbox, type LightboxImage } from "./components/media/Lightbox";
export { Reveal, RevealGroup, Parallax, CountUp } from "./components/motion/Motion";

// Hooks
export { useReducedMotion, useMediaQuery, useInView, useClock } from "./hooks";
