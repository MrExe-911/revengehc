import * as Icons from "lucide-react";
import DiscordIcon from "@/components/DiscordIcon";

// ------------------------------------------------------------------
// Semua icon di bawah ini bisa dipakai dengan menulis namanya (persis
// seperti key di object ini) di field `icon` pada serverConfig.js,
// misal: icon: "Sword" atau icon: "Rocket".
// Daftar lengkap nama + kegunaannya ada di DOCS.md.
// ------------------------------------------------------------------
const map = {
  // Umum / navigasi
  LayoutGrid: Icons.LayoutGrid, Home: Icons.Home, Menu: Icons.Menu, X: Icons.X,
  Search: Icons.Search, SlidersHorizontal: Icons.SlidersHorizontal, ArrowRight: Icons.ArrowRight,
  ArrowLeft: Icons.ArrowLeft, ArrowUpRight: Icons.ArrowUpRight, ChevronDown: Icons.ChevronDown,
  ChevronUp: Icons.ChevronUp, Plus: Icons.Plus, Minus: Icons.Minus, Check: Icons.Check,
  Settings: Icons.Settings, LogIn: Icons.LogIn, UserPlus: Icons.UserPlus, Users: Icons.Users,
  Users2: Icons.Users2, Compass: Icons.Compass, Globe: Icons.Globe, MousePointerClick: Icons.MousePointerClick,

  // Server / teknis
  Server: Icons.Server, Wifi: Icons.Wifi, Cpu: Icons.Cpu, Monitor: Icons.Monitor,
  Database: Icons.Database, HardDrive: Icons.HardDrive, Bot: Icons.Bot, Activity: Icons.Activity,
  Gamepad2: Icons.Gamepad2, Clock: Icons.Clock, CalendarDays: Icons.CalendarDays, CalendarHeart: Icons.CalendarHeart,

  // Rank / gamer
  Map: Icons.Map, Shield: Icons.Shield, ShieldCheck: Icons.ShieldCheck, ShieldPlus: Icons.ShieldPlus,
  Sparkles: Icons.Sparkles, Crown: Icons.Crown, Flame: Icons.Flame, Star: Icons.Star,
  Trophy: Icons.Trophy, Medal: Icons.Medal, Award: Icons.Award, Zap: Icons.Zap,
  Sword: Icons.Sword, Swords: Icons.Swords, Target: Icons.Target, Flag: Icons.Flag,
  Rocket: Icons.Rocket, Skull: Icons.Skull, Ghost: Icons.Ghost, Wand2: Icons.Wand2,
  Anvil: Icons.Anvil, PawPrint: Icons.PawPrint, Trees: Icons.Trees, TreePine: Icons.TreePine,
  Mountain: Icons.Mountain, Anchor: Icons.Anchor, Fish: Icons.Fish, Bird: Icons.Bird,
  Bug: Icons.Bug, Cat: Icons.Cat, Dog: Icons.Dog, Snowflake: Icons.Snowflake,
  Sun: Icons.Sun, Moon: Icons.Moon, CloudLightning: Icons.CloudLightning,
  Eye: Icons.Eye, EyeOff: Icons.EyeOff,

  // Ekonomi / store
  Coins: Icons.Coins, CircleDollarSign: Icons.CircleDollarSign, Gem: Icons.Gem,
  Gift: Icons.Gift, Boxes: Icons.Boxes, Package: Icons.Package, Key: Icons.Key,
  Lock: Icons.Lock, Unlock: Icons.Unlock, Wallet: Icons.Wallet, ShoppingCart: Icons.ShoppingCart,
  ShoppingBag: Icons.ShoppingBag, Tag: Icons.Tag, Ticket: Icons.Ticket, Truck: Icons.Truck,
  Hammer: Icons.Hammer, Wrench: Icons.Wrench, Apple: Icons.Apple, Feather: Icons.Feather,
  Cross: Icons.Cross, Palette: Icons.Palette,

  // Sosial / komunikasi
  MessageCircle: Icons.MessageCircle, MessageSquare: Icons.MessageSquare, Send: Icons.Send,
  Discord: DiscordIcon,
  Youtube: Icons.Youtube, Instagram: Icons.Instagram, Music2: Icons.Music2, Music: Icons.Music,
  Camera: Icons.Camera, Heart: Icons.Heart, ThumbsUp: Icons.ThumbsUp, ThumbsDown: Icons.ThumbsDown,
  Hash: Icons.Hash,

  // Info / dokumen
  Newspaper: Icons.Newspaper, ScrollText: Icons.ScrollText, HelpCircle: Icons.HelpCircle,
  Info: Icons.Info, FileText: Icons.FileText, User: Icons.User,
};

export default function Icon({ name, className = "w-4 h-4", ...rest }) {
  const Cmp = map[name] || Icons.Boxes;
  return <Cmp className={className} {...rest} />;
}

export const iconNames = Object.keys(map);
