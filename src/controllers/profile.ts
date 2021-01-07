import express, { RequestHandler } from "express";
import { Res, Req, Nxt } from "../TS/types";
import { IProfile, Profile } from "../models/Profile";

export const ProfileCTRL: RequestHandler = async (req: Req, res: Res) => {
  const userID = ((req as any).user as { id: string }).id;
  const body = req.body;
  try {
    let profile: IProfile | null = await Profile.findOne({ user: userID });
    if (profile) {
      return res.status(400).json({ msg: "User already exist" });
    }
    profile = {
      user: userID,
      ...body,
    };
    const newProfile = new Profile(profile);
    await newProfile.save();
    res.send(newProfile);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
