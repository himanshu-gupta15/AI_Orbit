import { userRepository, UserRepository } from "@/repositories/user.repository";
import { SignupInput, LoginInput } from "@/lib/validations/auth.validation";
import { hashPassword, comparePassword, signToken, SafeUser } from "@/lib/auth";

export class AuthService {
  constructor(private userRepo: UserRepository = userRepository) {}

  async signup(
    input: SignupInput
  ): Promise<{ user: SafeUser; token: string }> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.userRepo.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: "user",
    });

    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: safeUser, token };
  }

  async login(
    input: LoginInput
  ): Promise<{ user: SafeUser; token: string }> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await comparePassword(input.password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: safeUser, token };
  }

  async getCurrentUser(userId: string): Promise<SafeUser | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
